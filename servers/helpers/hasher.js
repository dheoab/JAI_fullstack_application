const jwt = require("jsonwebtoken");

const secretKey = "SECRET";

const signToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

const validateToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { signToken, validateToken };
