const jwt = require("jsonwebtoken");

function GenerateToken(userId) {
  const token = jwt.sign({ userId: userId }, `${process.env.JWT_SECRET}`);
  return token;
}

module.exports = GenerateToken;
