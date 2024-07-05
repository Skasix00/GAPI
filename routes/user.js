const express = require("express");
const authProvider = require("../provider/auth");
const Model = require("../model/user");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/getAllUsers", async (req, res) => {
	try {
		const data = await Model.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/login", async (req, res) => {
	try {
		const data = await Model.findOne({ username: req.query.username });
		const password = req.query.password;

		if (data.password !== password) {
			res.status(403).send("Login Inválido");
		} else {
			res.status(200).json(data);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/createUser", async (req, res) => {
	const isExisting = await Model.findOne({ username: req.body.username });
	if (isExisting) {
		res.status(500).json({ message: "O utilizador já existe" });
	} else {
		const password = req.body.password;
		const encryptedPassword = await authProvider.encryptPassword(password);
		const data = await new Model({
			name: req.body.name,
			age: req.body.age,
			username: req.body.username,
			address: req.body.address,
			password: encryptedPassword,
			token: req.body.token,
			active: 1,
		});

		try {
			const dataToSave = await data.save();
			res.status(200).json(dataToSave);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}
});

router.delete("/deleteUser", async (req, res) => {
	try {
		const token = req.query.token;
		const isValid = authProvider.VerifyToken(token.trim());
		if (isValid === "OK") {
			await Model.findByIdAndDelete(req.query.id);
			res.status(200).send("Utilizador eleminado com sucesso!");
		} else {
			res.status(403).send("FORBIDDEN");
		}
	} catch (error) {
		console.log(error);
		res.send(403, "Não foi possível eleminar o utilizador: ", error);
	}
});

router.get("/generateToken/:id", async (req, res) => {
	const token = await authProvider.GenerateToken(req.id);
	res.status(200).json({
		status: "OK",
		data: { AccessToken: token },
	});
});

router.post("/verifyToken", async (req, res) => {
	const token = req.query.token;
	const sanitizedToken = await authProvider.removeFirstAndLastChars(token);
	console.log(sanitizedToken);
	if (sanitizedToken) {
		const isValidToken = authProvider.VerifyToken(sanitizedToken);

		isValidToken === "OK"
			? res.status(200).json({
					status: "OK",
			  })
			: res.status(403).json({
					status: "FORBIDDEN",
					data: {
						Message: "Token is invalid",
					},
			  });
	} else {
		res.status(403).json({
			status: "FORBIDEN",
			data: {
				Message: "Token not provided",
			},
		});
	}
});

module.exports = router;
