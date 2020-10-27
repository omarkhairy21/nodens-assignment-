// selectors
const signupBtn = document.querySelector('.signUp_btn');
const signupForm = document.querySelector('.signUp_form');
const loginBtn = document.querySelector('.login_btn');
const loginForm = document.querySelector('.signUp_form');

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
  event.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.errors) {
      $(loginForm).form('add errors', [responseData.errors]);
    }
    if (response.status === 201) {
      $(loginForm).form('clear');
      $('.login_modal').modal('hide');
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
    console.log(responseData);
    if (responseData.errors) {
      $(signupForm).form('add errors', [responseData.errors]);
    }
    if (response.status === 201) {
      $('.signUp_modal').modal('hide');
    }
  } catch (error) {
    console.log(error);
  }
});
