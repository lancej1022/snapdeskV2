import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';

import { verify } from 'jsonwebtoken';
import { UserResolver } from './resolvers/UserResolver';
import { User } from './entity/User';

import { createRefreshToken, createAccessToken } from './middleware/auth';
import { sendRefreshToken } from './middleware/sendRefreshToken';

const PORT = process.env.port || 4000;

// Lambda / IIFE so that we can write an async function that starts itself
const main = async () => {
  /**
   * Define our GraphQL stuff here
   */
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();

  /**
   * Generate our gql server here
   * We set CORS to false because we need to set our own
   */
  apolloServer.applyMiddleware({ app, cors: false });

  app.use(
    cors({
      origin: process.env.origin || 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.get('/hello', (_req, res) => res.send('hello'));

  // specific route for refreshing tokens -- no need to do via gql.
  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;
    if (!token) return res.send({ ok: false, accessToken: '' });

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: '' });
    }

    // if we make it here, token is valid and we can send back access token
    const user = await User.findOne({ id: payload.userId });
    if (!user) return res.send({ ok: false, accessToken: '' });

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  await createConnection();

  app.listen(PORT, () => {
    console.log('express server started');
  });
};

main();
