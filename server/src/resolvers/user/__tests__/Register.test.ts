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

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    email
  }
}
`;

describe('Register resolver', () => {
  it('crates a user', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    });

    expect(response).toMatchObject({
      data: {
        register: {
          email: user.email,
        },
      },
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
  });
});
