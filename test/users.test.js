const { getTestResponse, truncateDatabase } = require('./helpers.js');
// const errors = require('../app/errors');

const User = require('../app/models').users;

const singUpUser = { name: 'test', lastName: 'testing', email: 'test@testing.com', password: 'abcd1234' };
const params = {
  method: 'post',
  url: '/users',
  body: {}
};

describe('Succesful case', () => {
  let response = {};
  let newUser = {};
  let bodyCompare = {};
  beforeAll(async () => {
    params.body = singUpUser;
    await truncateDatabase();
    response = await getTestResponse(params);
    newUser = await User.findOne();
    bodyCompare = {
      id: newUser.id,
      name: newUser.name,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password
    };
  });

  test('User created ,the status code must be 201', () => expect(response.status).toBe(201));
  test('user information must be in the body', () => expect(response.body).toMatchObject(bodyCompare));
});

describe('Existing email', () => {
  beforeAll(async () => {
    params.body = singUpUser;
    await truncateDatabase();
  });
  test('Email existing,the status code must be 401', () =>
    User.create(singUpUser).then(() =>
      getTestResponse(params).then(response => expect(response.status).toBe(401))
    ));
});

describe('Failure cases users', () => {
  const user = {};
  const { name, lastName, email, password } = user;
  describe.each([
    { email: 'leand', password, name },
    { lastName, email, password: 1234 },
    { name, lastName, email },
    { password, name, lastName },
    {}
  ])('schema sent in the request: %p', schema => {
    let response = {};
    beforeAll(async () => {
      params.body = schema;
      await truncateDatabase();
      response = await getTestResponse(params);
    });
    test('The error must be schema error', () => {
      expect(response.body.internal_code).toBe('schema_error');
    });
    test('The statusCode must be 400', () => {
      expect(response.statusCode).toBe(400);
    });
  });
});
