// helper functions organized in their own files
const { checkIsStrongPassword } = require("../../utils/authMethods");

function checkIsStrongPasswordFunc(req, res, next) {
  //let errorObj = {};

  const { errorObj } = res.locals; //tailored to incoming data from CRUD req scope

  // if (!checkIsStrongPassword(req.body.password)) { // if the password from the object's body is not strong
  //   errorObj.weakPassword = // tell program that the password user inputted is weak
  //     "Password must include 1 lowercase, 1 uppercase, 1 special character, 1 number, and a length of 8"; // tell user what to include in password to make it strong
  // }

  next(); // indicator to run the next func
}

module.exports = checkIsStrongPasswordFunc; // tells app to run / export this helper function
