var mongoose = require("mongoose");

var competitorSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	team: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team",
		required: true
	}
});

var Competitor = mongoose.model("Competitor", competitorSchema);