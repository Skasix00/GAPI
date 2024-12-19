const express = require("express");
const TodoListModel = require("../model/todoListTodoModel");

const router = express.Router();

//Need to add authentication to the routes

///Task List///

//Get All TODOS
router.get("/todos/getAll", async (req, res) => {
	try {
		const data = await TodoListModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get specific TODO
router.get("/todos/:id", async (req, res) => {
	try {
		const isExisting = await TodoListModel.findOne({ _id: req.params.id });
		res.json(isExisting);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Update specific TODO
router.put("/todos/update/:id", async (req, res) => {
	let serviceId = req.params.id;
	try {
		const updatedModel = await TodoListModel.findByIdAndUpdate(serviceId, {
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
			isActive: req.body.isActive,
			isDeleted: req.body.isDeleted,
		});
		res.status(200).json(updatedModel);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Submit a new TODO
router.post("/todos/addNew", async (req, res) => {
    console.log(req.body);
	const data = await new TodoListModel({
		id: req.body.id,
		text: req.body.text,
		created_at: req.body.created_at,
		isCompleted: req.body.isCompleted,
		completed_at: req.body.completed_at,
	});

	try {
		const dataToSave = await data.save();
		res.status(200).json(dataToSave);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Delete a TODO
router.delete("/todos/delete", async (req, res) => {
	try {
		await TodoListModel.findByIdAndDelete(req.query.id);
		res.status(200).send("Serviço eleminado com sucesso!");
	} catch (error) {
		console.log(error);
		res.send(403, "Não foi possível eleminar o serviço: ", error);
	}
});

module.exports = router;
