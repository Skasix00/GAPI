const express = require("express");
const authProvider = require("../provider/auth");
const Model = require("../model/user");
const router = express.Router();

router.get("/getAllUsers", async (req, res) => {
	try {
		const data = await Model.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/createUser", async (req, res) => {
	const data = new Model({
		name: req.body.name,
		age: req.body.age,
		username: req.body.username,
		address: req.body.address,
		password: req.body.password,
		token: req.body.token,
		active: 1,
	});

	try {
		const dataToSave = await data.save();
		res.status(200).json(dataToSave);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.delete("/deleteUser", (req, res) => {
	try {
		const token = req.query.token;
		const isValid = authProvider.VerifyToken(token);

		if (isValid === "OK") {
			Model.findByIdAndDelete(req.query.id);
			res.send(200, "Utilizador eleminado com sucesso!");
		} else {
			res.status(403).send("FORBIDDEN");
		}
	} catch (error) {
		res.send(403, "Não foi possível eleminar o utilizador: ", error);
	}
});

router.get("/generateToken/:id", (req, res) => {
	const token = authProvider.GenerateToken(req.id);
	res.status(200).json({
		status: "OK",
		data: { AccessToken: token },
	});
});

router.post("/verifyToken", (req, res) => {
	const token = req.query.token;

	if (token) {
		const isValidToken = authProvider.VerifyToken(token);

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
