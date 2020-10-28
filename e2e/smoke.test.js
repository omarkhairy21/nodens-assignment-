const puppeteer = require('puppeteer');
const User = require('../models/User');
let page, browser;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
  await page.goto('http://localhost:3002');
});

afterEach(async () => {
  await browser.close();
});

describe('Landing page loads', () => {
  it('Should find Login and Signup buttons', async () => {
    const loginBtn = await page.$eval('.login_btn', (el) => el.innerHTML);
    const signupBtn = await page.$eval('.signUp_btn', (el) => el.innerHTML);
    expect(loginBtn).toEqual('Login');
    expect(signupBtn).toEqual('Signup');
  });
});

describe('Signup', () => {
  it('Signup with valid credentials', async () => {
    // fill the all form inputs
    await page.click('.signUp_btn');
    await page.type('.name_input', 'test66', { delay: 100 });
    await page.type('.email_input', 'test3565@test.com', { delay: 100 });
    await page.type('.pass_input', 'test6635', { delay: 100 });
    await page.type('.confirm_pass_input', 'test6635', { delay: 100 });
    // submit the form
    await page.click('.submit_signup');
    await page.waitForNavigation(); // wait until navigate to /user/profiles
    await page.waitForSelector('.header__h1');
    // find the user name
    const text = await page.$eval('.header__h1', (el) => el.innerHTML);
    // assert the name of the user render correctly in his profile page
    expect(text).toEqual('Hello, test66');
  });
});
describe('login', () => {
  it('login with valid credentials', async () => {
    // fill the all form inputs
    await page.click('.login_btn');
    await page.type('.email_input', 'test3565@test.com', { delay: 100 });
    await page.type('.pass_input', 'test6635', { delay: 100 });
    // submit the form
    await page.click('.submit_login');
    await page.waitForNavigation(); // wait until navigate to /user/profiles
    await page.waitForSelector('.header__h1');
    // find the user name
    const text = await page.$eval('.header__h1', (el) => el.innerHTML);
    // assert the name of the user render correctly in his profile page
    expect(text).toEqual('Hello, test66');
  });
});

// afterAll(async () => {
//   // delete the test user if exists
//   const delUser = await User.deleteOne({ email: 'test3565@test.com' });
//   console.log(delUser)
// });
