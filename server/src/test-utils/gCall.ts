import { graphql, GraphQLSchema } from 'graphql';
import { createSchema } from '../createSchema';

interface Options {
  source: string;
  variableValues?: any;
  userId?: number;
}

let schema: GraphQLSchema;

/**
 * Serves as an easy way to set up a test env
 * so that we don't need to manually duplicate code constantly
 */
export const gCall = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {},
      res: {},
    },
  });
};
