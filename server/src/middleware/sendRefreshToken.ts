import { Response } from 'express';

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    expires: new Date(Date.now() + 700000),
    httpOnly: true,
    // THE BELOW CODE CAN BE USED SO THAT THE COOKIE WORKS WHEN DEPLOYED
    // domain: '.lancejeffers.com'
    // path: '/refresh_token', <-- we DONT want a path, since we need this to fire on all client pages
  });
};
