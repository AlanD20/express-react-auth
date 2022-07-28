const jwt = require('jsonwebtoken');

const PRIVATE_KEY = process.env.PRIVATE_KEY ?? '1234';

const JWTToken = {
  create(id, email) {
    return jwt.sign({ id, email }, PRIVATE_KEY);
  },
  verify(token) {
    return jwt.verify(token, PRIVATE_KEY);
  },
};

module.exports = JWTToken;
