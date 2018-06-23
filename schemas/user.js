var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: function(email) {
				var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				return re.test(email);
			},
			message: "Email invalid"
		}
	},
	password: {
		type: String,
		required: true
	},
	name: String
});

var User = mongoose.model("User", userSchema);

module.exports = User;