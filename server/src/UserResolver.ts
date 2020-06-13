import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
} from 'type-graphql';
import { hash, compare } from 'bcrypt';
import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';
import { sendRefreshToken } from './middleware/sendRefreshToken';
import { User } from './entity/User';
import { MyContext } from './MyContext';
import { createRefreshToken, createAccessToken } from './middleware/auth';

import { isAuth } from './middleware/isAuth';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

// declare the class as a resolver
/**
 * FUNCTIONALITY THE EQUIVEALENT OF:
 * typeDefs: `
    type Query {
      hello: String!
    }`,
    resolvers: {
      Query: {
        hello: () => 'hello world',
      },
    },
 */
/* eslint-disable */
@Resolver()
export class UserResolver {
  // the anonymous function tells the Query which TypeScript type to expect
  @Query(() => [User])
  users() {
    return User.find();
  }

  // query for fetching all info about the current user
  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers['authorization'];

    // no currently logged in user
    if (!authorization) return null;

    try {
      const token = authorization.split(' ')[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Query(() => String)
  // isAuth will be used to verify the user is logged in
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    return `your user id is ${payload!.userId}`;
  }

  // the anon function specifies that we will return the TS type "Boolean"
  @Mutation(() => Boolean)
  async register(
    // format: the name of the graphql argument (aka what the client would send), the variable name, the TypeScript type
    // unlike in the query, we're letting TypeGrapghql infer the type of the argument rather than specifying: ('email', () => String)
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    // hash the user's password with 12 rounds for the salt
    const hashedPass = await hash(password, 12);
    // inserts the user to the database
    try {
      await User.insert({
        email,
        password: hashedPass,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  /**
   * THIS SHOULD BE extracted to another function later, rather than exposing it to the client
   * basically its used to increment the tokenVersion we have in our db, which will cause older tokens to mismatch
   */
  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(@Arg('userId', () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, 'tokenVersion', 1);

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    // Ctx stands for Context (from graphql)
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    // find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) throw new Error('could not find user');

    const valid = await compare(password, user.password);
    if (!valid) throw new Error('password did not match');

    // login was successful, so create a refreshToken
    // jid basically means json ID, but its generic so that clients ideally cant tell what it is
    sendRefreshToken(res, createRefreshToken(user));

    return {
      // first arg: payload we want to turn into jwt, second arg = secret key
      // in a production environment the secret should be kept in an env file
      // keep the access token short to 15mins
      accessToken: createAccessToken(user),
      user,
    };
  }
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    // fire our refreshToken func, but pass in an empty string in order to create an invalidate token, thereby logging the user out
    // could also do res.clearCookie but this helps preserve the shape of the cookie for the user
    sendRefreshToken(res, '');
    return true;
  }
}
/* eslint-disable */
