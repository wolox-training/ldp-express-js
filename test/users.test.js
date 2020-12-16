const { getTestResponse, truncateDatabase } = require('./helpers.js');
// const errors = require('../app/errors');

const User = require('../app/models').users;

const logInUser = { email: 'test@testing.com', password: 'abcd1234' };
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
    test('The statusCode must be 422', () => {
      expect(response.statusCode).toBe(422);
    });
    test('The error must be schema error', () => {
      expect(response.body.internal_code).toBe('schema_error');
    });
  });
});

describe('Login succesful cases', () => {
  beforeAll(async () => {
    params.body = singUpUser;
    params.url = '/users';
    await truncateDatabase();
  });

  test('Login success,the status code must be 200', () =>
    getTestResponse(params).then(() => {
      params.body = logInUser;
      params.url = '/users/sessions';
      return getTestResponse(params).then(response => expect(response.status).toBe(200));
    }));
});

describe('Failure cases users login', () => {
  const user = {};
  const { email, password } = user;
  params.body = singUpUser;
  params.url = '/users';
  const paramsLogIn = params;
  let response = {};

  describe('wrong password and email cases', () => {
    describe.each([
      { email: 'test@testing.com', password: '1234abcd' },
      { email: 'test2@testing.com', password: 'abcd1234' }
    ])('Login error,user sent in the request: %p', loginUser => {
      beforeAll(async () => {
        await getTestResponse(params);
        paramsLogIn.body = loginUser;
        paramsLogIn.url = '/users/sessions';
        response = await getTestResponse(paramsLogIn);
      });
      test('wrong email or password,the status code must be 400', () => expect(response.status).toBe(400));

      test('The error must be authentication error', () => {
        expect(response.body.internal_code).toBe('authentication_error');
      });

      afterAll(async () => {
        await truncateDatabase;
      });
    });
  });

  describe.each([{ email: 'leand', password }, { email, password: 1234 }, { email }, { password }, {}])(
    'Schema error,schema sent in the request: %p',
    schema => {
      beforeAll(async () => {
        params.body = schema;
        params.url = '/users/sessions';
        await truncateDatabase();
        response = await getTestResponse(params);
      });
      test('The statusCode must be 422', () => {
        expect(response.statusCode).toBe(422);
      });
      test('The error must be schema error', () => {
        expect(response.body.internal_code).toBe('schema_error');
      });
    }
  );
});
