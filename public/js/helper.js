const errorMessageDiv = document.querySelector('.ui.error.message');

function handleFormErrorMessage(message) {
  const UL = document.createElement('ul');
  const LI = document.createElement('li');
  LI.textContent = message;
  UL.classList.add('list');
  UL.appendChild(LI);
  errorMessageDiv.appendChild(UL);
}
