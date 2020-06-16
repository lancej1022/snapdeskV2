import faker from 'faker';
import { Connection } from 'typeorm';
import { testConnection } from '../../../test-utils/testConnection';
import { gCall } from '../../../test-utils/gCall';
import { User } from '../../../entity/User';

let conn: Connection;

beforeAll(async () => {
  conn = await testConnection();
});

afterAll(async () => {
  await conn.close();
});

const meQuery = `
 {
  me {
    id
    email
  }
}
`;

describe('Me Resolver', () => {
  it('properly retrieves the user', async () => {
    const user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save();

    const response = await gCall({
      source: meQuery,
      variableValues: {
        data: user,
      },
    });
  });
});
