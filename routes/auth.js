var express = require("express");
var router = express.Router();
const { check, checkSchema } = require("express-validator");
const { signout, signup, signin } = require("../controllers/auth");

var Schema = {
  "role": {
    in: 'body',
    matches: {
      options: [/\b(?:editor|contributor|user)\b/],
      errorMessage: "Invalid role"
    }
  }
}

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 }),
    checkSchema(Schema),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
