const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
	id: { required: true, type: String },
	text: { required: true, type: String },
	created_at: { required: true, type: String },
	isCompleted: { required: true, type: Boolean },
	completed_at: { required: false, type: String },
});

module.exports = mongoose.model("TodoListService", dataSchema);