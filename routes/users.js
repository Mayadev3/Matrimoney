var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { ensureSameUser } = require("../middleware/guards");

//get user id so he can only see his own profile

router.get("/:id", ensureSameUser, async function (req, res, next) {
  let { id } = req.params;
  let sql = `select * from users where id=${id}`;

  try {
    let results = await db(sql);
    let user = results.data[0];
    delete user.password;
    res.send(user);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

//I GOT ALL THE USERS HERE JUST TO MAKE SURE I CAN TEST IT IN THE BACKEND AND SEE IF I AM ABLE TO SEE ALL MY USERS
//USUALLY DEVELOPERS JUST ADD THIS SO THEY CAN SEE ALL THEIR USERS

//WHY DO I NEED TO GEET ALL USERS IF I AM ONLY GONNA USE USER BY ID IN MY FRONT END?

/**
 * Get all users
 **/

router.get("/", async function (req, res, next) {
  let sql = "SELECT * FROM users ORDER BY username";

  try {
    let results = await db(sql);
    let users = results.data;
    users.forEach((u) => delete u.password); // don't return passwords...why if i want to see everything about each user?
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
