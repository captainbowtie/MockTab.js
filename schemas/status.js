var mongoose = require("mongoose");

var statusSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	key: String,
	value: String
});

var Status = mongoose.model("Status", statusSchema);