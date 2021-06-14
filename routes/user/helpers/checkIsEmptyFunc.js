// helper functions organized in their own files
const { checkIsEmpty } = require("../../utils/authMethods");

//this function checks any incoming data is empty if is empty send error message back
//else go to the next middleware function next()
function checkIsEmptyFunc(req, res, next) {
  let inComingData = req.body; // set inComingData = the body of the object

  const { errorObj } = res.locals; // specific to CRUD req scope

  for (let key in inComingData) {
    if (checkIsEmpty(inComingData[key])) {
      // checks to see if the input field is empty with incoming data key
      errorObj[key] = `${key} cannot be empty`; // if err is found, alert user that key input cannot be empty
    }
  }

  if (Object.keys(errorObj).length > 0) {
    // if there is an error
    return res.status(500).json({ message: "failure", payload: errorObj }); // respond with 500 status to alert failure in errorObj req
  } else {
    next(); //indicator to run the next function
  }
}

module.exports = checkIsEmptyFunc; // tells app to run / export this helper function
