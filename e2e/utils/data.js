const faker = require('faker');
const username = faker.internet.userName();
const email = faker.internet.email();
const password = faker.internet.password(6);

module.exports = { email, username, password };
