import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types/MyContext';
import { verify } from 'jsonwebtoken';

/**
 *
 * @param param0
 * @param next
 * expect the user to send a header for 'authorization in the format of : bearer 0128978dfvdfg
 */

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('not authenticated');
  }

  try {
    const token = authorization.split(' ')[1];
    // the payload will wind up being the user ID of the user, since thats how we generate our tokens
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    // context.payload = user ID after the above step
    // will be used in index.ts for authenticating routes
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error('not authenticated');
  }

  return next();
};
