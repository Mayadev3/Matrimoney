var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//i noticed that /income in the backend is called funds/display in the front end since the funds button when you click it , it is linked to /funds/display and this is fine
//BUT we do the delete and the post and the get all in the backend

/* GET income listing. */
router.get("/", async function (req, res, next) {
  try {
    let result = await db(`SELECT * FROM income`);
    res.send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/", async function (req, res, next) {
  let newIncome = req.body;
  let sql = `
    INSERT INTO income (text, amount)
    VALUES ("${newIncome.text}", ${newIncome.amount})
  `;
  try {
    await db(sql);
    let result = await db(`SELECT * FROM income`);
    res.status(201).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.patch("/:id", async function (req, res, next) {
  //with patch there is an id and the changes cause we need to know which item needs changing and in what way
  const id = req.params.id;
  const changes = req.body;
  let sql = `
    UPDATE income
    SET amount_used = ${changes.amount} WHERE id = ${id}
  `;
  try {
    await db(sql);
    let result = await db(`SELECT * FROM income`);
    res.send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.delete("/:id", async function (req, res, next) {
  let id = req.params.id;
  try {
    let result = await db(`SELECT * FROM income WHERE id = ${id}`);
    if (result.data.length === 0) {
      res.status(404).send({ error: "item not found" });
    } else {
      await db(`DELETE FROM income WHERE id = ${id}`);
      let result = await db(`SELECT * FROM income`);
      res.send(result.data);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
