var mongoose = require("mongoose");

var buildingSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	name: {
		type: String,
		required: true
	}
});

var Building = mongoose.model("Building", buildingSchema);

module.exports = Building;