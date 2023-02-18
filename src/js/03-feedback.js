const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('[name="email"]');
const messageInput = document.querySelector('[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';
let formData = {
  email: '',
  message: '',
};

getFormData();

function saveInLocalStorage(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function loadFromLocalStorage(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

form.addEventListener('input', throttle(setFormData, 500));
form.addEventListener('submit', setOutput);

function setFormData(event) {
  if (event.target.name === 'email') {
    formData.email = event.target.value;
  } else {
    formData.message = event.target.value;
  }
  saveInLocalStorage(LOCALSTORAGE_KEY, formData);
}

function getFormData() {
  if (loadFromLocalStorage(LOCALSTORAGE_KEY)) {
    formData.email = loadFromLocalStorage(LOCALSTORAGE_KEY).email;
    emailInput.value = formData.email;
    formData.message = loadFromLocalStorage(LOCALSTORAGE_KEY).message;
    messageInput.value = formData.message;
  }
}

function setOutput(event) {
  event.preventDefault();
  console.log(`email: ${formData.email} message: ${formData.message}`);
  form.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
  formData = {
    email: '',
    message: '',
  };
}
