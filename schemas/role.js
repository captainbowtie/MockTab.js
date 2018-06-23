var mongoose = require("mongoose");

var roleSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	role: String
});

var Role = mongoose.model("Role", roleSchema);