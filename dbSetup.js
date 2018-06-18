const urls = require("./db.js");
const MongoClient = require("mongodb");

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
		});
	}
	
	client.close();
});