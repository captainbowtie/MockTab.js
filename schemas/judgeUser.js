var mongoose = require("mongoose");

var judgeUserSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	judge: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Judge"
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

var JudgeUser = mongoose.model("JudgeUser", judgeUserSchema);