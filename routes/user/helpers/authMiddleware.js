const {
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
} = require("../../utils/authMethods"); // works directly with authMethod.js - here requiring the path where they can be found

function checkIsEmailFunc(req, res, next) {
  //function that check if it's an email
  const { errorObj } = res.locals; // refers to data in CRUD reqs

  if (!checkIsEmail(req.body.email)) {
    // if the inputted email does not match the email in the body of the object
    errorObj.wrongEmailFormat = "Must be in email format!"; // alert user that there is an error and an action to take to fix err
  }

  next(); // tells app to go to the next func
}

function checkIsAlphaFunc(req, res, next) {
  // function to check case sensitive func, taking in req, res, and next args
  const { errorObj } = res.locals; // set errorObj to local CRUD req data
  const inComingData = req.body; // assigned variable for incoming data to be = to body of object
  for (key in inComingData) {
    // for loop to watch incoming data
    if (key === "firstName" || key === "lastName") {
      // checks to see if key values assigned match incoming data
      if (!checkIsAlpha(inComingData[key])) {
        // if they don't...
        errorObj[`${key}`] = `${key} can only have characters`; // let program know errorObj failed and display string <- about key info
      }
    }
  }

  next(); // indicator to run the next function
}

function checkIsAlphanumericFunc(req, res, next) {
  // function to check if incoming data is alphanumerical - letters & numbers
  const { errorObj } = res.locals; // set errorObj to local CRUD req data
  if (!checkIsAlphanumeric(req.body.username)) {
    //if the incoming data from object's username is not alphanumerical
    errorObj.usernameError = "username can only have characters and numbers"; // alert the err in and tell the user the rules for username input
  }

  next(); // indicates to go to next one
}

module.exports = {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
}; // tells app which functions to run
