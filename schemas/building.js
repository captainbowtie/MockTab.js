var mongoose = require("mongoose");

var buildingSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String
});

var Building = mongoose.model("Building", buildingSchema);