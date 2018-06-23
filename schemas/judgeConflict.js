var mongoose = require("mongoose");

var judgeConflictSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	team: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team",
		required: true
	},
	judge: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Judge",
		required: true
	}
});

var JudgeConflict = mongoose.model("JudgeConflict", judgeConflictSchema);