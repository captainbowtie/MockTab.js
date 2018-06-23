var mongoose = require("mongoose");

var judgeUserSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	judge: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Judge",
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	}
});

var JudgeUser = mongoose.model("JudgeUser", judgeUserSchema);