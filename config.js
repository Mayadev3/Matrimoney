require("dotenv").config();

// Required by bcrypt
const SECRET_KEY = process.env.SECRET_KEY || "my weak (!!) secret key";
const BCRYPT_WORK_FACTOR = 12; // determines "strength" of hashing..//the higher the number the weaker
//passwords are hashed the first time th euser registers/signs up.. and then each time he logs in and submits his password, it is hashed as well to compare it to the original hashed password and then it it thrown away
//each time a user logs in , he gets a new access token

module.exports = {
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};
