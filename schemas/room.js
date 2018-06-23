var mongoose = require("mongoose");

var roomSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	building: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Building",
		required: true
	},
	number: {
		type: Number,
		required: true
	},
	availableRound1: Boolean,
	availableRound2: Boolean,
	availableRound3: Boolean,
	availableRound4: Boolean
});

var Room = mongoose.model("Room", roomSchema);