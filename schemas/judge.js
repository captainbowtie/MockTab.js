var mongoose = require("mongoose");

var judgeSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	availableRound1: Boolean,
	availableRound2: Boolean,
	availableRound3: Boolean,
	availableRound4: Boolean,
	quality: Number
});

var Judge = mongoose.model("Judge", judgeSchema);