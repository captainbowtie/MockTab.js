const urls = require("./db");
const mongoose = require("mongoose");
const Ballot  = require("./schemas/ballot");
const Building = require("./schemas/ballot");
const Coach = require("./schemas/coach");
const Competitor = require("./schemas/competitor");
const Judge = require("./schemas/judge");
const JudgeConflict = require("./schemas/judgeConflict");
const JudgeUser = require("./schemas/judgeUser");
const Pairing = require("./schemas/pairing");
const Role = require("./schemas/role");
const Room = require("./schemas/room");
const Status = require("./schemas/status");
const Team = require("./schemas/team");
const TeamConflict = require("./schemas/teamConflict");
const User = require("./schemas/user");
const UserRole = require("./schemas/userRole");

//Create admin user
const adminUser = new User({
	_id: new mongoose.Types.ObjectId(),
	email: "admin@mocktab.js",
	password: "66746ad3c2025daae865c793d2becd6e6f5719e0e528adc0ae2f5228332702081a5f100f2bb3e6c56c7b7de872af0c3dc755b4673c2490e1bd7a7002565ebfe8", //Whirlpool hash of "mocktrial"
	name: "Admin"
});

//Create admin role
const adminRole = new Role({
	_id: new mongoose.Types.ObjectId(),
	role: "admin"
});

//Create tab role
const tabRole = new Role({
	_id: new mongoose.Types.ObjectId(),
	role: "tab"
});

//Create coach role
const coachRole = new Role({
	_id: new mongoose.Types.ObjectId(),
	role: "coach"
});

//Create judge role
const judgeRole = new Role({
	_id: new mongoose.Types.ObjectId(),
	role: "judge"
});

//Grant admin privilege to admin user
const adminUserRole = new UserRole({
	_id: new mongoose.Types.ObjectId(),
	user: adminUser._id,
	role: adminRole._id
});

mongoose.connect(urls.setup, function (err) {
 
	//Drop old collections
	mongoose.connection.db.listCollections({name: "ballots"})
		.next(function(err, collinfo) {
			if (collinfo) {
				// The collection exists
				Ballot.collection.drop();
			}
		});

	mongoose.connection.db.listCollections({name: "buildings"})
		.next(function(err, collinfo) {
			if (collinfo) {
				// The collection exists
				Building.collection.drop();
			}
		});

	mongoose.connection.db.listCollections({name: "coaches"})
		.next(function(err, collinfo) {
			if (collinfo) {
				// The collection exists
				Coach.collection.drop();
			}
		});


	mongoose.connection.db.listCollections({name: "competitors"})
		.next(function(err, collinfo) {
			if (collinfo) {
				// The collection exists
				Competitor.collection.drop();
			}
		});

	mongoose.connection.db.listCollections({name: "judges"})
		.next(function(err, collinfo) {
			if (collinfo) {
				// The collection exists
				Judge.collection.drop();
			}
		});

	mongoose.connection.db.listCollections({name: "judgeconflicts"})
		.next(function(err, collinfo) {
			if (collinfo) {
				// The collection exists
				JudgeConflict.collection.drop();
			}
		});

	mongoose.connection.db.listCollections({name: "judgeusers"})
		.next(function(err, collinfo) {
			if (collinfo) {
				// The collection exists
				JudgeUser.collection.drop();
			}
		});

	mongoose.connection.db.listCollections({name: "pairings"})
		.next(function(err, collinfo) {
			if (collinfo) {
				// The collection exists
				Pairing.collection.drop();
			}
		});

	mongoose.connection.db.listCollections({name: "roles"})
		.next(function(err, collinfo) {
			if (collinfo) {
				// The collection exists
				Role.collection.drop(function(err,res){
					adminRole.save(function(err) {if (err) throw err;});
					tabRole.save(function(err) {if (err) throw err;});
					coachRole.save(function(err) {if (err) throw err;});
					judgeRole.save(function(err) {if (err) throw err;});
				});
			}else{
				adminRole.save(function(err) {if (err) throw err;});
				tabRole.save(function(err) {if (err) throw err;});
				coachRole.save(function(err) {if (err) throw err;});
				judgeRole.save(function(err) {if (err) throw err;});
			}
		});

	mongoose.connection.db.listCollections({name: "rooms"})
		.next(function(err, collinfo) {
			if (collinfo) {
				// The collection exists
				Room.collection.drop();
			}
		});


	mongoose.connection.db.listCollections({name: "status"})
		.next(function(err, collinfo) {
			if (collinfo) {
				// The collection exists
				Status.collection.drop();
			}
		});

	mongoose.connection.db.listCollections({name: "teams"})
		.next(function(err, collinfo) {
			if (collinfo) {
				// The collection exists
				Team.collection.drop();
			}
		});

	mongoose.connection.db.listCollections({name: "teamconflicts"})
		.next(function(err, collinfo) {
			if (collinfo) {
				// The collection exists
				TeamConflict.collection.drop();
			}
		});

	mongoose.connection.db.listCollections({name: "users"})
		.next(function(err, collinfo) {
			if (collinfo) {
				// The collection exists
				User.collection.drop(function(err,res){
					adminUser.save(function(err) {if (err) throw err;});
				});
			}else{
				adminUser.save(function(err) {if (err) throw err;});
			}
		});

	mongoose.connection.db.listCollections({name: "userroles"})
		.next(function(err, collinfo) {
			if (collinfo) {
				// The collection exists
				UserRole.collection.drop(function(err,res){
					adminUserRole.save(function(err) {if (err) throw err;});
				});
			}else{
				adminUserRole.save(function(err) {if (err) throw err;});
			}
		});
});