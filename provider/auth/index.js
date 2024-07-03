const jwt = require("jsonwebtoken");

function GenerateToken(userId) {
	const token = jwt.sign({ userId: userId }, `${process.env.JWT_SECRET}`);
	return token;
}

function VerifyToken(token) {
	if (token) {
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		return "OK";
	} else {
		return null;
	}
}

module.exports = { GenerateToken, VerifyToken };
