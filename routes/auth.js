var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const db = require("../model/helper");

//login the user

router.post("/", async (req, res) => {
  let { username, password } = req.body; //this is what the user will login with... you can also let the user login with the email and password

  try {
    //rememeber this is after registration and now the user is trying to login so the username should be in the database..and if it is not in the database they need to register but if the username is in the database then continue to line 44
    //here the server is selecting everything from the database that is related to that user and then responding back
    //on line 50 it is matching the username in the database with that of the one the user typed into the username input field form
    let results = await db(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    //here i am saying if what the server gives back to the client is empty then thwo an error or else sending this info
    if (results.data.length === 0) {
      // Username not found.. a status 401 means lacks valid authentication credentials for the requested resource
      res.status(401).send({ error: "Login failed" });
    } else {
      let user = results.data[0]; // the user's row/record from the DB
      let passwordsEqual = await bcrypt.compare(password, user.password); //the compare is a function so password is the value of the variable..bcrypth.compare hashes the password i am sending when logged in because i have bcrypt before compare... the compare function returns a boolean
      //it is user.password cause it is the user from line 43 and it is only an array of one object
      if (passwordsEqual) {
        //now create the payload and the token
        // Passwords match so create the payload which is info about the user cause on line 56 we are forming the token which consists of a payload, secret key and a sign
        let payload = { userId: user.id }; //this is the format in the jwt framework which is a small object with key/value pairs.. so in postman you notice
        //  "user": {
        //     "id": 1,
        //     "username": "user1",
        //     "email": "user1@acme.com"
        // }
        // Create token containing user ID
        //the header consists of a signing algorithm and a type being jwt so to form the token you put type which is jwt and a .sign which is a signing function with parameters payload and secret key where the sign is actually encoding the user's id into the token
        let token = jwt.sign(payload, SECRET_KEY); //the signature/signing process is to verify that the token hasnt been tampered with
        // Also return user (without password)
        delete user.password; //so this is so not to send the password back to the browser cause the next step in line 53 is a send
        res.send({
          message: "Login succeeded",
          token: token,
          user: user,
        }); //so in postman upon log in you will see that the server sends those to the client: the message, the token, and the user object
      } else {
        // Passwords don't match
        res.status(401).send({ error: "Login failed" });
      }
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
