const { testResponse, truncateDatabase } = require('./helper');

const User = require('../app/models').users;

const singUpUser = { name: 'test', lastName: 'testing', email: 'test@testing.com', password: 'abcd1234' };

describe('Test Users', () => {
  beforeAll(() => truncateDatabase());

  test('Should sign up for a user', () => testResponse('post', '/users', singUpUser, 201));

  test('Should test error email existing', () =>
    User.create(singUpUser)
      .then(testResponse('post', '/users', singUpUser, 401))
      .catch(err => err));

  test('Should test error invalid password', () =>
    testResponse('post', '/users', { ...singUpUser, email: 'test2@testing.com', password: 'abcd' }, 400));

  test('Should test missing parameters', () => testResponse('post', '/users', {}, 400));

  afterAll(() => truncateDatabase());
});
