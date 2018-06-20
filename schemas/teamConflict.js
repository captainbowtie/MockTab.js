var mongoose = require("mongoose");

var teamConflictSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	team1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team"
	},
	team2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team"
	}
});

var TeamConflict = mongoose.model("TeamConflict", teamConflictSchema);