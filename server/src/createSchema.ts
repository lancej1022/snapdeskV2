import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user/UserResolver';

export const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver],
  });
