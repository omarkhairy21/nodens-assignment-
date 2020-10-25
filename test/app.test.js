const request = require('supertest');
const app = require('../app.js');
const User = require('../models/User');
it('Should signup new user', async () => {
    const response = await request(app).post('/signup').send({
      name: 'omar',
      email: 'omar@example.com',
      password: 'MyPass546!'
    }).expect(201)

    const user = await User.findOne({email: response.body.email })
    expect(user).not.toBeNull()
    expect(response.body).toMatchObject({
      userId: user._id.toString(),
      name: user.name,
      email: user.email
    });

    expect(user.password).not.toBe('MyPass546');
});