require("dotenv").config();

const mongoose = require("mongoose"); //initializes mongoose (a mongoDB library) after npm i-ing it through terminal

const app = require("./app"); //requires the path /app

const port = 3000; //port at which code will be displayed in the browser

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) //connects mongoose (mongoDB library) global node environment
  .then(() => {
    // prompts system to run anonymous func
    app.listen(port, () => {
      //tells server to listen in on specific port
      console.log(`Server connected on ${port}`); //checks to make sure the server is running on that port and displays in inspector console
      console.log("MongoDB Connected"); // checks to make sure mongoDB is connected and displays in inspector console
    });
  })
  .catch((e) => {
    //.catch blocks tells server to check for errors and catch any that may exist
    console.log(e); // catches and displays error
  });
