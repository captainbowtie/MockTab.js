var mongoose = require("mongoose");

var teamSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	number: Number,
	name: String
});

var Team = mongoose.model("Team", teamSchema);