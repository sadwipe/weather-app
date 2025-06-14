export default function displayErrorMessage(message) {
  const searchButton = document.querySelector('.search-button');
  const form = document.querySelector('.search-form');

  // For not adding multiple error messages
  if (form.querySelector('.error')) {
    return;
  }

  const errorMessage = document.createElement('p');

  errorMessage.textContent = message;
  errorMessage.classList.add('error');
  form.insertBefore(errorMessage, searchButton);
}
