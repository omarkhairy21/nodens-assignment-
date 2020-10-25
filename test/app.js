const request = require('supertest');
const app = require('../app.js');

it('Should signup new user', async () => {
    const response = await request(app).post('signup');
});