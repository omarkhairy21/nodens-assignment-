const signupBtn = document.querySelector('.ui.green.button');
const signupForm = document.querySelector('.signUp_form');

$('.ui.modal').modal();

signupBtn.addEventListener('click', () => {
  $('.ui.modal').modal('show');
});

/**
 * Signup Form Validation
 */
$('.ui.form').form({
  on: 'blur',
  fields: {
    email: {
      identifier: 'email',
      rules: [
        {
          type: 'empty',
          prompt: 'Please enter your e-mail',
        },
        {
          type: 'email',
          prompt: 'Please enter a valid e-mail',
        },
      ],
    },
    name: {
      identifier: 'name',
      rules: [
        {
          type: 'empty',
          prompt: 'Please enter your name',
        },
      ],
    },
    password: {
      identifier: 'password',
      rules: [
        {
          type: 'empty',
          prompt: 'Please enter your password',
        },
        {
          type: 'length[6]',
          prompt: 'Your password must be at least 6 characters',
        },
      ],
    },
    confirmPassword: {
      identifier: 'confirm-password',
      rules: [
        {
          type: 'match[password]',
          prompt: 'Passwords do not match',
        },
      ],
    },
  },
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
      $('.ui.form').form('add errors', [responseData.errors]);
    }
    if (response.status === 201) {
      $('.ui.modal').modal('hide');
    }
  } catch (error) {
    console.log(error);
  }
});
