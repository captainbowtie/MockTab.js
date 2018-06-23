var mongoose = require("mongoose");

var pairingSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	round: {
		type: Number,
		required: true
	},
	plaintiff: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team",
		required: true
	},
	defense: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team",
		required: true
	},
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Room",
		required: true
	}
});

var Pairing = mongoose.model("Pairing", pairingSchema);