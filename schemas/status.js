var mongoose = require("mongoose");

var statusSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	key: String,
	value: String
});

var Status = mongoose.model("Status", statusSchema);