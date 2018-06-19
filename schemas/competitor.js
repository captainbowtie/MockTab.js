var mongoose = require("mongoose");

var competitorSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: String,
	lastName: String,
	team: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Team'
	}
});