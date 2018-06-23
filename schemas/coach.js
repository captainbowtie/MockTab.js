var mongoose = require("mongoose");

var coachSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	team: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team",
		required: true
	}
});

var Coach = mongoose.model("Coach", coachSchema);

module.exports = Coach;