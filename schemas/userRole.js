var mongoose = require("mongoose");

var userRoleSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	role: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Role"
	}
});

var UserRole = mongoose.model("UserRole", userRoleSchema);