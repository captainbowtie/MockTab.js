var mongoose = require("mongoose");

var coachSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	team: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team"
	}
});

var Coach = mongoose.model("Coach", coachSchema);