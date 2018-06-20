var mongoose = require("mongoose");

var judgeConflictSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	team: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team"
	},
	judge: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Judge"
	}
});

var JudgeConflict = mongoose.model("JudgeConflict", judgeConflictSchema);