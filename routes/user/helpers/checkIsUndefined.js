// helper functions organized in their own files
function checkIsUndefined(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    // if the specific object key's length = 0 (empty), send indicator to fill in fields
    return res.status(500).json({ message: "Please fill out the form" }); // respond with err status 500 and a msg to user telling them to fill out form
  } else {
    let errorObj = {}; // set errorObj to empty object
    res.locals.errorObj = errorObj; // specific to CRUD req incoming data
    next(); // indicator to run next func
  }
}

module.exports = checkIsUndefined; // tells app to run / export this helper function
