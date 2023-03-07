var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { ensureUserLoggedIn } = require("../middleware/guards");

//is this route in the right file?
//how do i make sure it is the user i am looking for? do i use ensureSameUSer and how?
//do i still need to do anything in the sql file regarding those tow tables?
router.get("/", ensureUserLoggedIn, async function (req, res, next) {
  const { userId } = req.payload; //this is coming from the guard
  let sql = `SELECT * FROM cost_actual LEFT JOIN income ON cost_actual.income_id = income.id WHERE userId= ${userId}`;
  //so here i am returning everything from cost_actual and from income table related to the user?
  try {
    let results = await db(sql);
    if (results.data.length === 0) {
      res.status(404).send({ error: `item not found` });
    } else {
      res.send(results.data);
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

//get a cost by id
router.get("/:id", async function (req, res, next) {
  let id = Number(req.params.id);
  try {
    let result = await db(`SELECT * FROM cost_actual WHERE id = ${id}`);
    if (result.data.length === 0) {
      res.status(404).send({ error: "item not found" });
    } else {
      res.send(result.data);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
//add a new cost
router.post("/", async function (req, res, next) {
  let newCostItem = req.body;
  let sql = `
    INSERT INTO cost_actual (text, amount, notes, income_id)
    VALUES ("${newCostItem.text}", ${newCostItem.amount}, "${newCostItem.notes}", ${newCostItem.income_id})
  `;
  try {
    await db(sql);
    let result = await db(`SELECT * FROM cost_actual`);
    res.status(201).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
//delete a cost
router.delete("/:id", async function (req, res, next) {
  let id = req.params.id;
  try {
    let result = await db(`SELECT * FROM cost_actual WHERE id = ${id}`);
    if (result.data.length === 0) {
      res.status(404).send({ error: "item not found" });
    } else {
      await db(`DELETE FROM cost_actual WHERE id = ${id}`);
      let result = await db(`SELECT * FROM cost_actual`);
      res.send(result.data);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
