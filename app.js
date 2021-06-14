const express = require("express"); // this brings in Express library into app after downloading via terminal
const logger = require("morgan"); // brings in Morgan logger || grabs specific incoming data

const app = express(); //initializes express in the app

const userRouter = require("./routes/user/userRouter"); // refers to the

app.use(logger("dev")); //middleware - give app abilities to log out the requests we're making

app.use(express.json());
//middleware - parses form data/incoming data - w/out this the app doesn't do anything
app.use(express.urlencoded({ extended: false })); //middleware - parses incoming reqs w/ urlencoded payloads

app.use("/api/user", userRouter); //refers to the location and file where you can find specific code info

module.exports = app; // tells node which code to export from files
