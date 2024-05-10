const fullnameInput = document.getElementById('fullname');
const phoneInput = document.getElementById('phone');
const birthdayInput = document.getElementById('birthday');

fullnameInput.addEventListener('input', validateFullname);
phoneInput.addEventListener('input', validatePhone);
birthdayInput.addEventListener('input', validateBirthday);

function validateFullname() {
  const fullnameValue = fullnameInput.value.trim();

  if (fullnameValue === '') {
    setError(fullnameInput, 'This is a required field');
  } else if (fullnameValue.match(/[(!\@\#\$\%\^\&\*)]/)) {
    setError(fullnameInput, 'Your full name must not contain numbers and special characters');
  } else if (fullnameValue.match(/[0-9]/)) {
    setError(fullnameInput, 'Your full name must not contain numbers and special characters');
  } else if (fullnameValue.length < 2 || fullnameValue.length > 64) {
    setError(fullnameInput, 'Your full name must be between 2 and 64 characters');
  } else if (fullnameInput.value !== fullnameValue) {
    setError(fullnameInput, 'Full name should not start or end with spaces');
  } else {
    setSuccess(fullnameInput);
  }
}

function validatePhone() {
  const phoneValue = phoneInput.value.trim();

  if (phoneValue === '') {
    setError(phoneInput, 'This is a required field');
  } else if (!/^\d+$/.test(phoneValue)) {
    setError(phoneInput, 'Please enter only numbers and check the phone number format (e.g., +123456789)');
  } else if (phoneValue.length > 20) {
    setError(phoneInput, 'Please enter only numbers and check the phone number format (e.g., +123456789)');
  } else if (!/^[a-zA-Z0-9]+$/.test(phoneValue)) {
    setError(phoneInput, 'Please enter only numbers and check the phone number format (e.g., +123456789)');
  } else {
    setSuccess(phoneInput);
  }
}

function validateBirthday() {
  const birthdayValue = birthdayInput.value.trim();

  if (birthdayValue === '') {
    setError(birthdayInput, 'This is a required field');
  } else {
    const selectedDate = new Date(birthdayValue);
    const currentDate = new Date();
    
    if (selectedDate > currentDate) {
      setError(birthdayInput, 'Please select a valid birthday');
    } else {
      setSuccess(birthdayInput);
    }
  }
}

function setError(element, message) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
}

function setSuccess(element) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';
  inputControl.classList.remove('error');
}