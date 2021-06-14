const {
  isEmpty,
  isStrongPassword,
  isEmail,
  isAlpha,
  isAlphanumeric,
} = require("validator"); // uses validator js to validate fields

const checkIsEmpty = (target) => (isEmpty(target) ? true : false); // shorthand ternary statement to check if the input field is empty

const checkIsStrongPassword = (password) =>
  isStrongPassword(password) ? true : false; // function that checks password strength, using password as the arg the func takes in to process T or F boolean

const checkIsEmail = (email) => (isEmail(email) ? true : false); // checks if email === email

const checkIsAlpha = (target) => (isAlpha(target) ? true : false); // ternary statement to check casing

const checkIsAlphanumeric = (target) => (isAlphanumeric(target) ? true : false); // checks if target input data is alphanumeric -> containing letters and nums

module.exports = {
  checkIsEmpty,
  checkIsStrongPassword,
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
}; // tells app which functions to run - here based on authenticating true boolean values
