var mongoose = require("mongoose");

var pairingSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	round: Number,
	plaintiff: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team"
	},
	defense: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team"
	},
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Room"
	}
});