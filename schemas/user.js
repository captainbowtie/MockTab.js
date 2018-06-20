var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: String,
	password: String,
	name: String
});

var User = mongoose.model("User", userSchema);