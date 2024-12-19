const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String,
	},
	age: {
		required: true,
		type: Number,
	},
	username:{
		required: true,
		type: String,
	},
	address:{
		required: true,
		type: String,
	},
	password:{
		required: true,
		type: String,
	},
	token:{
		required: true,
		type: String,
	},
	group:{
		required: true,
		type: Number

	},
	active:{
		required: true,
		type: Boolean

	},
	client_id:{
		required: false,
		type: String,
	},
});

module.exports = mongoose.model("User", dataSchema);
