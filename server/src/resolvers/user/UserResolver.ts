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
import { sendRefreshToken } from '../../middleware/sendRefreshToken';
import { User } from '../../entity/User';
import { MyContext } from '../../types/MyContext';
import { createRefreshToken, createAccessToken } from '../../middleware/auth';

import { isAuth } from '../../middleware/isAuth';
import { RegisterInput } from './register/RegisterInput';

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
    etc
 */

/* eslint-disable */
@Resolver()
export class UserResolver {
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
  @Mutation(() => LoginResponse)
  async register(
    @Arg('data') { email, password }: RegisterInput,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    // hash the user's password with 12 rounds for the salt
    const hashedPass = await hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPass,
    }).save();

    // return user;
    // login was successful, so create a refreshToken
    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    // Ctx stands for Context (from graphql)
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse | null> {
    // find user by email
    const user = await User.findOne({ where: { email } });

    // if we dont find a user, simply return null rather than revealing the reason for the error
    if (!user) return null;

    const valid = await compare(password, user.password);
    // if password doesn't match, return null rather than revealing any errors
    if (!valid) return null;

    // login was successful, so create a refreshToken
    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
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

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    // fire our refreshToken func, but pass in an empty string in order to create an invalidate token, thereby logging the user out
    // could also do res.clearCookie
    sendRefreshToken(res, '');
    return true;
  }
}
/* eslint-disable */
