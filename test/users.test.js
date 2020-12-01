const { testResponse } = require('./helper');

const singUpUser = { name: 'test', lastName: 'testing', email: 'test@testing.com', password: 'abcd1234' };

test('Should sign up for a user', testResponse('post', '/users', singUpUser, 201));
