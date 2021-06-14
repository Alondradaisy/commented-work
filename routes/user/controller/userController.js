const bcrypt = require("bcryptjs"); //instantiates bycrypt
const User = require("../model/User"); // instantiates User by telling it where (what path) its code is located

const jwt = require("jsonwebtoken"); //instantiates jwToken

async function signup(req, res) {
  //runs the asynchronous signup function and takes in the 2 args (request & response)
  const { username, email, password, firstName, lastName } = req.body; // creates an array of variables and sets them = to grab from the body of the object

  const { errorObj } = res.locals; //creates errorObj variable to grab errors that appear in CRUD reqs - res.locals only pertains to the work in the routers

  if (Object.keys(errorObj).length > 0) {
    //if statement to check if there are errors in the user object
    return res.status(500).json({ message: "failure", payload: errorObj }); // returns response of 500 (err msg) with message telling user there is an err and payload data
  }

  try {
    // try block to test out the function
    let salt = await bcrypt.genSalt(12); // salt to generate and wait for bycrypt - 12 = time it takes to hash pswd to secure database (pswds should be stored safely w/ highest priority)
    let hashedPassword = await bcrypt.hash(password, salt); //bycrypt password assigned as a variable enables program to build and save secure password using salt

    const createdUser = new User({
      //user object from user.js schema
      firstName, //input field
      lastName, //input field
      email, //input field
      username, //input field
      password: hashedPassword, //bcrypt password generator
    });

    let savedUser = await createdUser.save(); // tells program to save the createdUser based on user object above

    res.json({ message: "success", data: savedUser }); //tells app to send success msg if successfully created
  } catch (e) {
    // app will check to catch errors if any appear
    console.log(e); //checks and displays errs in console if any exist
    console.log(e.message); // if there is an err, display message saying there's been an err detected
    res.json({ message: "error", error: e }); // send an err msg telling user there's an error
  }
}

async function login(req, res) {
  // run the asynchronous login function that takes in request and response args
  const { email, password } = req.body; // assign email and password to user object body

  const { errorObj } = res.locals; // grab errors that appear in CRUD reqs - res.locals only pertains to the work in the routers

  if (Object.keys(errorObj).length > 0) {
    //if statement to check if there are errors in the user object
    return res.status(500).json({ message: "failure", payload: errorObj }); //returns error msg "failure" to user
  }

  try {
    // try block to run the function
    let foundUser = await User.findOne({ email: email }); // foundUser as a variable - checks to see if the email has been found, if so foundUser = T

    if (!foundUser) {
      // if email is not found
      res.status(400).json({
        // send 400 status to alert that it failed
        message: "failure", // raw message that tells user that email has not been found
        payload: "Please check your email and password", // msg and action for user to remedy the failed req
      });
    } else {
      //password = 1, foundUser.password = $2a$12$tauL3AEb5gvKdcQdDKNWLeIYv422jNq2aRsaNWF5J4TdcWEdhq4CO
      let comparedPassword = await bcrypt.compare(password, foundUser.password); // else if the email is found, compare it to the foundUser password to see if they match

      if (!comparedPassword) {
        // if the compared password does not match
        res.status(400).json({
          // send a 400 err status through JSON
          message: "failure", // send the user a "failure" msg
          payload: "Please check your email and password", // tell the user what action to take to remedy the 404
        });
      } else {
        let jwtToken = jwt.sign(
          //jwt token are json data keys
          {
            email: foundUser.email, //secure user email
            username: foundUser.username, // secure username
          },
          process.env.PRIVATE_JWT_KEY, //enclosed in env file
          {
            expiresIn: "1d", //time of expiration = 1 day
          }
        );

        res.json({ message: "success", payload: jwtToken }); // send a success msg through JSON and use jwt Token
      }
    }
  } catch (e) {
    // tells app to catch err if there are any
    res.json({ message: "error", error: e }); // if there is an err, send an err msg
  }
}

module.exports = { signup, login }; // tells app which functions to run
