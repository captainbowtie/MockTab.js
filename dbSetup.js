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
 
mongoose.connect(urls.setup, function (err) {
	if (err) {
		console.log(err);
	}
 
	//Drop old collections
	Ballot.collection.drop();
	Building.collection.drop();
	Coach.collection.drop();
	Competitor.collection.drop();
	Judge.collection.drop();
	JudgeConflict.collection.drop();
	JudgeUser.collection.drop();
	Pairing.collection.drop();
	Role.collection.drop();
	Room.collection.drop();
	Status.collection.drop();
	Team.collection.drop();
	TeamConflict.collection.drop();
	User.collection.drop();
	UserRole.collection.drop();

	//Create new admin user
	const adminUser = new User({
		_id: new mongoose.Types.ObjectId(),
		email: "admin@mocktab.js",
		password: "66746ad3c2025daae865c793d2becd6e6f5719e0e528adc0ae2f5228332702081a5f100f2bb3e6c56c7b7de872af0c3dc755b4673c2490e1bd7a7002565ebfe8", //Whirlpool hash of "mocktrial"
		name: "Admin"
	});

	//Save admin user to db
	adminUser.save(function(err) {if (err) throw err;});

	//Create admin role
	const adminRole = new Role({
		_id: new mongoose.Types.ObjectId(),
		role: "admin"
	});

	//Save admin role
	adminRole.save(function(err) {if (err) throw err;});

	//Create tab role
	const tabRole = new Role({
		_id: new mongoose.Types.ObjectId(),
		role: "tab"
	});

	//Save tab role
	tabRole.save(function(err) {if (err) throw err;});

	//Create coach role
	const coachRole = new Role({
		_id: new mongoose.Types.ObjectId(),
		role: "coach"
	});

	//Save coach role
	coachRole.save(function(err) {if (err) throw err;});

	//Create judge role
	const judgeRole = new Role({
		_id: new mongoose.Types.ObjectId(),
		role: "judge"
	});

	//Save admin role
	judgeRole.save(function(err) {if (err) throw err;});

	//Grant admin privilege to admin user
	const adminUserRole = new UserRole({
		_id: new mongoose.Types.ObjectId(),
		user: adminUser._id,
		role: adminRole._id
	});

	//Save admin privilege grant
	adminUserRole.save(function(err) {if (err) throw err;});

});




/*Drop old collections

const collections = [
	"users",
	"teams",
	"competitors",
	"buildings",
	"rooms",
	"judges",
	"judgeConficts",
	"teamConflicts",
	"roles",
	"userRoles",
	"pairings",
	"judgeUsers",
	"coaches",
	"ballots",
	"status"];

MongoClient.connect(urls.setup, function(err, client) {
	if (err) throw err;

	const db = client.db("MockTab");

	for(let collectionName of collections){
		db.collection(collectionName).drop(function(){
		}).then();
	}
	
	client.close();
});

//Create new collections

	MongoClient.connect(urls.setup, function(err, cli) {
		if (err) throw err;

		const db = cli.db("MockTab");

		db.createCollection("test",function(){
		});
	
		cli.close();
	});
*/