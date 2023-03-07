const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/**
 * Guards are middleware that "protect" route functions
 **/

/**
 * Make sure the user is logged in
 **/

//this gaurd was sent to the costs.js file route cause it needs the id of the payload to access the profile info
function ensureUserLoggedIn(req, res, next) {
  let token = _getToken(req);

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.payload = payload; //this is what i am passing to the next() layer, when i pass info to the next layer i use req
    //i am passing the payload cause it has the id
    next();
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
}

/**
 * Make sure user is logged in and is accessing his/her own page.
 * i.e. userId in token === userId in URL param
 **/
//this guard was sent to the users.js file route
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
  if (!("authorization" in req.headers)) {
    return "";
  }

  // Split header into 'Bearer' and token
  let authHeader = req.headers["authorization"];
  let [str, token] = authHeader.split(" ");

  return str === "Bearer" ? token : ""; //here i use return not req cause i am sending it to the functions above
}

module.exports = {
  ensureUserLoggedIn,
  ensureSameUser,
};
