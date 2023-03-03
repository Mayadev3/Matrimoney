var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { userSameUser } = require("../middleware/guards");

//get user id so he can only see his own profile

router.get("/:id", userSameUser, async function (req, res, next) {
  let { userId } = req.params;
  let sql = `select * from users where id=${userId}`;

  try {
    let results = await db(sql);
    let user = results.data[0];
    delete user.password;
    res.send(user);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});
