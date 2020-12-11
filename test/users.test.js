const { getTestResponse, truncateDatabase } = require('./helpers.js');
const errors = require('../app/errors');

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
  afterAll(() => truncateDatabase());
});

describe('Wrong parameters', () => {
  beforeAll(async () => {
    params.body = singUpUser;
    await truncateDatabase();
  });

  test('Email existing,the status code must be 401', () =>
    User.create(singUpUser).then(() =>
      getTestResponse(params).then(response => expect(response.status).toBe(401))
    ));

  test('Email existing error must be in the body', () =>
    User.create(singUpUser).then(() =>
      getTestResponse(params).then(response => {
        const error = errors.emailExistingError('Error, email already exists');
        expect(response.body).toMatchObject({ message: error.message, internal_code: error.internalCode });
      })
    ));

  test('invalid password,the status code must be 400', () => {
    params.body = { ...singUpUser, password: 'abcd' };
    getTestResponse(params).then(response => expect(response.status).toBe(400));
  });
  test('invalid password error must be in the body', () => {
    params.body = { ...singUpUser, password: 'abcd' };
    const error = errors.invalidPasswordError('Invalid password');
    getTestResponse(params).then(response =>
      expect(response.body).toMatchObject({ message: error.message, internal_code: error.internalCode })
    );
  });
  afterAll(() => truncateDatabase());
});

describe('Missing parameters', () => {
  let response = {};
  beforeAll(async () => {
    params.body = {};
    await truncateDatabase();
    response = await getTestResponse(params);
  });

  test('Missing body, the status code must be 400', () => expect(response.status).toBe(400));
  test('missing body error must be in the body', () => {
    const error = errors.missingBodyError('missing body');
    expect(response.body).toMatchObject({ message: error.message, internal_code: error.internalCode });
  });
});
