var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var incomeRouter = require("./routes/income");
var budgetRouter = require("./routes/budget");
var costsRouter = require("./routes/costs");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/auth");

const cors = require("cors");

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/income", incomeRouter);
app.use("/budget", budgetRouter);
app.use("/budget/costs", costsRouter);
app.use("/users", usersRouter); //since i put /users then in the users.js no need to put /users in the route, it is enough to just put "/" cause this file and the users.js file is connected
app.use("/login", loginRouter);

module.exports = app;
