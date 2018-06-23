var mongoose = require("mongoose");

var judgeSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	name: {
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		}
	},
	availableRound1: Boolean,
	availableRound2: Boolean,
	availableRound3: Boolean,
	availableRound4: Boolean,
	quality: Number
});

var Judge = mongoose.model("Judge", judgeSchema);

module.exports = Judge;