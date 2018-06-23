var mongoose = require("mongoose");

var teamConflictSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true},
	team1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team",
		required: true
	},
	team2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team",
		required: true
	}
});

var TeamConflict = mongoose.model("TeamConflict", teamConflictSchema);