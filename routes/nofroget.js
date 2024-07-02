const express = require("express");
const Model = require("../model/nofrogetModel");

const router = express.Router();

//Get all posts
router.get("/getAll", async (req, res) => {
	try {
		const data = await Model.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get specific post
router.get("/post/:id", (req, res) => {
	res.send(req.params.id);
});

//Create a Post
router.post("/post", async (req, res) => {
	const data = new Model({
		name: req.body.name,
		age: req.body.age,
	});

	try {
		const dataToSave = await data.save();
		res.status(200).json(dataToSave);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});


//Need update and delete, both by ID
//Need to add authentication to the routes

module.exports = router;