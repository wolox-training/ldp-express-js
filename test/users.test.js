const { getTestResponse, truncateDatabase } = require('./helpers.js');

const User = require('../app/models').users;

const singUpUser = { name: 'test', lastName: 'testing', email: 'test@testing.com', password: 'abcd1234' };
const params = {
  method: 'post',
  url: '/users',
  body: {}
};

describe('Succesful case', () => {
  let response = {};
  beforeEach(async () => {
    params.body = singUpUser;
    await truncateDatabase();
    response = await getTestResponse(params);
  });

  test('The status code must be 201', () => expect(response.status).toBe(201));

  afterAll(() => truncateDatabase());
});

describe('Wrong parameters', () => {
  beforeEach(async () => {
    params.body = singUpUser;
    await truncateDatabase();
  });

  test('Email existing,the status code must be 401', () =>
    User.create(singUpUser).then(() =>
      getTestResponse(params).then(response => expect(response.status).toBe(401))
    ));

  test('invalid password,the status code must be 400', () => {
    params.body = { ...singUpUser, password: 'abcd' };
    getTestResponse(params).then(response => expect(response.status).toBe(400));
  });

  afterAll(() => truncateDatabase());
});

describe('Missing parameters', () => {
  let response = {};
  beforeEach(async () => {
    params.body = {};
    await truncateDatabase();
    response = await getTestResponse(params);
  });

  test('The status code must be 400', () => expect(response.status).toBe(400));
});
