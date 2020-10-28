const request = require('supertest');
const app = require('../app.js');
const User = require('../models/User');
const { userOneId, userOne, setupDatabase } = require('./helper/db');

beforeEach(setupDatabase);

it('Should signup new user', async () => {
  const response = await request(app)
    .post('/signup')
    .send({
      name: 'omar',
      email: 'omar@example.com',
      password: 'MyPass546!',
    })
    .expect(201);

  const user = await User.findOne({ email: response.body.email });
  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    userId: user._id.toString(),
    name: user.name,
    email: user.email,
  });

  expect(user.password).not.toBe('MyPass546');
});

it('should not signup the user with same email', async () => {
  const response = await request(app)
    .post('/signup')
    .send({
      email: userOne.email,
      name: userOne.name,
      password: userOne.password,
    })
    .expect(409);

  expect(response.body).toMatchObject({
    errors: 'The user with this email already exists',
  });
});
it('should login the user', async () => {
  const response = await request(app)
    .post('/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);

  expect(response.body).toMatchObject({
    userId: user._id.toString(),
    name: user.name,
    email: user.email,
  });
});

it('Should not login nonexistent user', async () => {
  await request(app)
    .post('/login')
    .send({
      email: 'noexistsUser@user.com',
      password: 'thisisnotmypass',
    })
    .expect(400);
});

it('Should not get profile for unauthenticated user', async () => {
  await request(app).get('/user/profile').send().expect(401);
});
