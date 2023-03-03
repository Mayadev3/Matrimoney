const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/**
 * Guards are middleware that "protect" route functions
 **/

/**
 * Make sure the user is logged in
 **/

function ensureUserLoggedIn(req, res, next) {
  let token = _getToken();

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
}

/**
 * Make sure user is logged in and is accessing his/her own page.
 * i.e. userId in token === userId in URL param
 **/

function ensureSameUser(req, res, next) {
  let token = _getToken(req);

  try {
    let payload = (token, SECRET_KEY);
    if (payload.userId === Number(req.params.id)) {
      next();
    } else {
      res.status(404).send({ error: `Forbidden` });
    }
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}

/**
 * Return the JWT token if found, else return ''
 * Authorization header string looks like: "Bearer <token>"
 **/

function _getToken(req) {
  if (!("autherization" in req.headers)) {
    return "";
  }

  // Split header into 'Bearer' and token
  let authHeader = req.headers["authorization"];
  let [str, token] = authHeader.split(" ");

  return str === "Bearer" ? token : "";
}

module.exports = {
  ensureUserLoggedIn,
  ensureSameUser,
};
