const express = require("express"); // initializes express within proj
const router = express.Router(); // initializes express within router

const { signup, login } = require("./controller/userController"); // functions stored in arr and what paths they're found in

const checkIsUndefined = require("./helpers/checkIsUndefined"); // brings in helper funcs
const checkIsEmptyFunc = require("./helpers/checkIsEmptyFunc"); // brings in helper funcs
const checkIsStrongPasswordFunc = require("./helpers/checkIsStrongPasswordFunc"); // brings in helper funcs

const {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
} = require("./helpers/authMiddleware"); // requires middleware helper funcs

router.post(
  // CRUD reqs to create for user signup
  "/sign-up",
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsStrongPasswordFunc,
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
  signup
);

router.post(
  // CRUD reqs to create for user login
  "/login",
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsEmailFunc,
  login
);

module.exports = router; // tells app which router CRUD functions to run
