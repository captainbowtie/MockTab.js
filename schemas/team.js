var mongoose = require("mongoose");

var teamSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		equired: true
	},
	number: {
		type: Number,
		required: true
	},
	name: String
});

var Team = mongoose.model("Team", teamSchema);