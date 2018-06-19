var mongoose = require("mongoose");

var ballotSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	pairing: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Pairing"
	},
	judge: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Judge"
	},
	p:{
		open: Number,
		close: Number,
		aDx1: Number,
		aDx2: Number,
		aDx3: Number,
		aCx1: Number,
		aCx2: Number,
		aCx3: Number,
		wDx1: Number,
		wDx2: Number,
		wDx3: Number,
		wCx1: Number,
		wCx2: Number,
		wCx3: Number
	},
	d:{
		open: Number,
		close: Number,
		aDx1: Number,
		aDx2: Number,
		aDx3: Number,
		aCx1: Number,
		aCx2: Number,
		aCx3: Number,
		wDx1: Number,
		wDx2: Number,
		wDx3: Number,
		wCx1: Number,
		wCx2: Number,
		wCx3: Number
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