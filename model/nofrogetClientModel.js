const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
	ClientName: {
		type: String,
		required: true,
	},
	Birthdate: {
		type: Date,
		required: false,
	},
	Age: {
		type: Number,
		required: false,
	},
	Score: {
		type: Number,
		required: false,
	},
	NVisits: {
		type: Number,
		required: false,
	},
});

module.exports = mongoose.model("NoFrogetClient", dataSchema);
