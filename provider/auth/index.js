const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

async function encryptPassword(password) {
	const salt = await bcrypt.genSalt(12);
	const hash = await bcrypt.hash(password, salt);
	return hash;
}

async function decryptPassword(password, passwordBD) {
	const isCorrect = await bcrypt.compare(password, passwordBD);
	return isCorrect;
}

async function removeFirstAndLastChars(input) {
	const sanitized = await input.substring(1, input.length - 1);
	return sanitized;
}
module.exports = { GenerateToken, VerifyToken, encryptPassword, decryptPassword, removeFirstAndLastChars };
