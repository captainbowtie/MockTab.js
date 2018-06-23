var mongoose = require("mongoose");

var teamSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		equired: true
	},
	number: {
		type: Number,
		required: true,
		validate: {
			validator: function(num) {
				return num > 1000 && num < 2000;
			},
			message: "Team number must be a number between 1000 and 2000"
		}
	},
	name: String
});

var Team = mongoose.model("Team", teamSchema);