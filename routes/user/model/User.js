const mongoose = require("mongoose"); //initializes mongoose library into proj

const userSchema = new mongoose.Schema({
  // new user object schema with mongoose
  firstName: {
    //schema input field
    type: String, // input type - string
  },
  lastName: {
    //input field
    type: String, // input type - string
  },
  username: {
    //input field
    type: String, // input type - string
    unique: true, // input ID type - boolean T/F -- uuid
  },
  email: {
    //input field
    type: String, // input type - string
    unique: true, // input ID type - boolean T/F -- uuid
  },
  password: {
    //input field
    type: String, // input type string -- (bycrypt for secure hashed passwords)
  },
});

module.exports = mongoose.model("user", userSchema); //tells app which code to run and where to find it
