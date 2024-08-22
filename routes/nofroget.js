const express = require("express");
const Model = require("../model/nofrogetModel");
const ServicesModel = require("../model/nofrogetServicesModel");
const ClientModel = require("../model/nofrogetClientModel");

const router = express.Router();

//Need update by ID
//All get specific record aren't working still
//Need to add authentication to the routes

///Services///

//Get All Available Services
router.get("/services/getAll", async (req, res) => {
	try {
		const data = await ServicesModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get specific clients
router.get("/services/:id", async (req, res) => {
	try {
		const isExisting = await ServicesModel.findOne({ _id: req.params.id });
		res.json(isExisting);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Submit a new Service
router.post("/services/addNew", async (req, res) => {
	const data = await new ServicesModel({
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
		isActive: req.body.isActive,
		isDeleted: req.body.isDeleted,
	});

	try {
		const dataToSave = await data.save();
		res.status(200).json(dataToSave);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Delete a Service
router.delete("/services/delete", async (req, res) => {
	try {
		await ServicesModel.findByIdAndDelete(req.query.id);
		res.status(200).send("Serviço eleminado com sucesso!");
	} catch (error) {
		console.log(error);
		res.send(403, "Não foi possível eleminar o serviço: ", error);
	}
});

///Clients///

//Get All Clients
router.get("/clients/getAll", async (req, res) => {
	try {
		const data = await ClientModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get specific client
router.get("/clients/:id", async (req, res) => {
	try {
		const isExisting = await ClientModel.findOne({ _id: req.params.id });
		res.json(isExisting);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Submit a new Client
router.post("/clients/addNew", async (req, res) => {
	const data = await new ClientModel({
		ClientName: req.body.ClientName,
		Birthdate: req.body.Birthdate,
		Age: req.body.Age,
		Score: req.body.Score,
		NVisits: req.body.NVisits,
		isActive: req.body.isActive,
		isDeleted: req.body.isDeleted,
	});

	try {
		const dataToSave = await data.save();
		res.status(200).json(dataToSave);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Delete a Client
router.delete("/clients/delete", async (req, res) => {
	try {
		await ClientModel.findByIdAndDelete(req.query.id);
		res.status(200).send("Cliente eleminado com sucesso!");
	} catch (error) {
		console.log(error);
		res.send(403, "Não foi possível eleminar o cliente: ", error);
	}
});

///Posts///

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
router.post("/post/addNew", async (req, res) => {
	const data = await new Model({
		title: req.body.title,
		start: req.body.start,
		end: req.body.end,
		client: req.body.client,
		description: req.body.description,
		nofpersons: req.body.nofpersons,
		category: req.body.category,
	});

	try {
		const dataToSave = await data.save();
		res.status(200).json(dataToSave);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Delete Post
router.delete("/post/delete", async (req, res) => {
	try {
		await Model.findByIdAndDelete(req.query.id);
		res.status(200).send("Marcação eleminada com sucesso!");
	} catch (error) {
		console.log(error);
		res.send(403, "Não foi possível eleminar a marcação: ", error);
	}
});

module.exports = router;
