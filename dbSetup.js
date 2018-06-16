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

/*Connect to database
MongoClient.connect(urls.setup, function(err, client) {
	//handle error if any
	if (err) throw err;
	
	const db = client.db("MockTab");

	//iterate through list of collections and delete the old one, then create a new one
	for(let collectionName of collections){
		//Delete the old collection
		db.collection(collectionName).drop(function(err,dropOK){
			if (err) throw err;

		});
	}
	client.close();
});
*/
for(let collectionName of collections){
	MongoClient.connect(urls.setup, function(err, client) {
		//handle error if any
		if (err) throw err;

		const db = client.db("MockTab");
		db.collection(collectionName).drop(function(err,dropOK){
			if (err) throw err;

		});
		client.close();
	});
}