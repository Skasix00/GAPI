const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
	title: {
		required: true,
		type: String,
	},
	start: {
		required: true,
		type: String,
	},
	end: {
		required: true,
		type: String,
	},
	client: {
		required: true,
		type: String,
	},
	description: {
		required: true,
		type: String,
	},
	nofpersons: {
		type: String,
	},
	category: {
		type: String,
	},
});

module.exports = mongoose.model("NoFroget", dataSchema);
