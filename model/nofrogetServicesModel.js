const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
	title: { required: true, type: String },
	description: { required: true, type: String },
	price: { required: true, type: Number },
	isActive: { required: true, type: Boolean },
	isDeleted: { required: true, type: Boolean },
});

module.exports = mongoose.model("NoFrogetService", dataSchema);
