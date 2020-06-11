import { User } from '../entity/User';
import { sign } from 'jsonwebtoken';

export const createAccessToken = (user: User) => {
  // we use the '!' for our secret because TS thinks it might be undefined when it isnt
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  });
};

// we use a token version to invalidate old tokens for a user, so we can just increment each new token's version
export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  );
};
