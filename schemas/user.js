var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: String
});

var User = mongoose.model("User", userSchema);