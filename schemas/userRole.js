var mongoose = require("mongoose");

var roleSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	role: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Role"
	}
});