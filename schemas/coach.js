var mongoose = require("mongoose");

var coachSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	team: {
		ref: mongoose.Schema.Types.ObjectId,
		ref: "Team"
	}
});