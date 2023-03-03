var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const db = require("../model/helper");

//login the user

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    let results = `select * from users where username="${username}"`;
    await db(results);
    if (results.data.length === 0) {
      res.status(401).send({ error: `Login Failed` });
    } else {
      let user = results.data[0];
      let passWordsEqual = await bcrypt.compare(password, user.password);
      if (passWordsEqual) {
        let payload = { userId: user.id };
        let token = jwt.sign(payload, SECRET_KEY);
        delete user.password;

        res.send({ message: `Login Successful`, token: token, user, user });
      } else {
        res.status(401).send(`Login Failed`);
      }
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

module.exports = router;
