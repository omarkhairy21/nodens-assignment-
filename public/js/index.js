// selectors
const signupBtn = document.querySelector('.signUp_btn');
const signupForm = document.getElementById('signUp_form');
const loginBtn = document.querySelector('.login_btn');
const loginForm = document.getElementById('login_form');

// init modal
$('.ui.modal').modal();

signupBtn.addEventListener('click', () => {
  $('.signUp_modal').modal('show');
});
loginBtn.addEventListener('click', () => {
  $('.login_modal').modal('show');
});

/**
 * @description Handle login form submit
 */
loginForm.addEventListener('submit', async (event) => {
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  event.preventDefault();
  try {
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const responseData = await response.json();

    if (responseData.errors) {
      $(loginForm).form('add errors', [responseData.errors]);
    }
    if (response.status === 200) {
      $(loginForm).form('clear');
      $('.login_modal').modal('hide');
      location.assign('/user/profile');
    }
  } catch (error) {
    console.log(error);
  }
});
/**
 * @description Handle signup form submit
 */
signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = signupForm.email.value;
  const name = signupForm.name.value;
  const password = signupForm.password.value;
  try {
    const response = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
      headers: { 'Content-Type': 'application/json' },
    });
    const responseData = await response.json();

    if (responseData.errors) {
      $(signupForm).form('add errors', [responseData.errors]);
    }
    if (response.status === 201) {
      $('.signUp_modal').modal('hide');
      location.assign('/user/profile');
    }
  } catch (error) {
    console.log(error);
  }
});
