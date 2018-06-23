var mongoose = require("mongoose");

var ballotSchema = mongoose.Schema({
	_id: {
		type:mongoose.Schema.Types.ObjectId,
		required: true
	},
	pairing: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Pairing",
		required: true
	},
	judge: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Judge",
		required: true
	},
	p:{
		open: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		close: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		aDx1: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		aDx2: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		aDx3: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		aCx1: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		aCx2: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		aCx3: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		wDx1: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		wDx2: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		wDx3: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		wCx1: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		wCx2: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		wCx3: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		}
	},
	d:{
		open: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		close: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		aDx1: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		aDx2: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		aDx3: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		aCx1: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		aCx2: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		aCx3: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		wDx1: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		wDx2: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		wDx3: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		wCx1: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		wCx2: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		},
		wCx3: {
			type: Number,
			validate: {
				validator: function(num) {
					return num > -1 && num < 11;
				},
				message: "Scores must be between 0 and 10"
			}
		}
	},
	outstandingA1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Competitor"
	},
	outstandingA2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Competitor"
	},
	outstandingA3: {
		type: mongoose.Schema.Types.ObjectId,
		judge: "Competitor"
	},
	outstandingA4: {
		type: mongoose.Schema.Types.ObjectId,
		judge: "Competitor"
	},
	outstandingW1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Competitor"
	},
	outstandingW2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Competitor"
	},
	outstandingW3: {
		type: mongoose.Schema.Types.ObjectId,
		judge: "Competitor"
	},
	outstandingW4: {
		type: mongoose.Schema.Types.ObjectId,
		judge: "Competitor"
	}
});

var Ballot = mongoose.model("Ballot", ballotSchema);

module.exports = Ballot;