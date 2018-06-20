var mongoose = require("mongoose");

var roomSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	building: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Building"
	},
	number: Number,
	availableRound1: Boolean,
	availableRound2: Boolean,
	availableRound3: Boolean,
	availableRound4: Boolean
});

var Room = mongoose.model("Room", roomSchema);