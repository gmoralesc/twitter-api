const request = require('supertest');

const server = require('../server');
const config = require('../server/config');
const database = require('../server/database');

const { getUser } = require('./fixtures/users');

beforeAll(() => {
  const url = `${config.database.url}-test`;
  database.connect({ url }, {});
});

afterAll(() => {
  database.disconnect();
});

describe('Users', () => {
  test('The user can signup', async () => {
    const user = getUser({});

    const response = await request(server)
      .post('/api/v1/users/signup')
      .set('Content-type', 'application/json')
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe(`${user.firstname} ${user.lastname}`);
  });
});
