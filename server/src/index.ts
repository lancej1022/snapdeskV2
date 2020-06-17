import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { verify } from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

import { User } from './entity/User';
import { createSchema } from './createSchema';
import { createRefreshToken, createAccessToken } from './middleware/auth';
import { sendRefreshToken } from './middleware/sendRefreshToken';

const PORT = process.env.port || 4000;
// const isProduction = process.env.NODE_ENV === 'production';

// Lambda / IIFE so that we can write an async function that starts itself
const main = async () => {
  // connect to PG database
  const connection = await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();

  app.use(
    cors({
      origin: process.env.origin || 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: 'http://localhost:4000/auth/github/callback',
      },
      async (_accessToken: string, _refreshToken: string, profile: any, cb: any) => {
        console.log(profile);
        const { id, emails } = profile;
        // only grab their first email if they have mutliple
        const email = emails[0].value;

        const user = await connection
          .getRepository(User)
          .createQueryBuilder('user')
          .where('user.githubId = :id', { id })
          .orWhere('user.email = :email', { email })
          .getOne();

        // const user = await query.getOne();
        // if we DONT already have a registered user, make one
        if (!user) {
          await User.create({
            githubId: id,
            email,
          }).save();
        } else if (!user.githubId) {
          // we found user by email, but not github. Update their account to associate with github
          user.githubId = id;
          await user.save();
        }

        return cb(null, { id: user!.id });
      }
    )
  );

  /**
   * GitHub  + Google OAuth
   */
  app.use(passport.initialize());
  app.get(
    '/auth/github',
    passport.authenticate('github', { scope: ['user:email'], session: true }),
    (_req, _res, next) => {
      next();
    }
  );

  app.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (_req, res) => {
      /**
       * TO DO:
       * add a JWT cookie when they login with oauth
       */
      res.redirect('http://localhost:3000/home');
    }
  );

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

  /**
   * Generate our gql + express  server here
   * We set CORS to false because we need to set our own otherwise apollo freaks out
   * Note that this bit of code must be one of the last things inside of main()
   * otherwise we may get cors errors
   */
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log('express server started');
  });
};

main().catch((err) => console.error(err));
