var mongoose = require("mongoose");

var roleSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	role: String
});

var Role = mongoose.model("Role", roleSchema);