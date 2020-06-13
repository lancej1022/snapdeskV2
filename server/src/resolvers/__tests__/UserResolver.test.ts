import { request } from 'graphql-request';

const host = 'http://localhost:4000';
const email = 'bob@bob.com';
const password = 'bob';

const mutation = `
mutation {
  register(email: "${email}", password: "${password}")
}`;

test('registers a user', async () => {
  const response = await request(host, mutation);
  expect(response).toEqual({ register: true });
});
