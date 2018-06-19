const urls = require("./db");
var mongoose = require("mongoose");
 

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
 
mongoose.connect(urls.setup, function (err) {
 
	if (err) throw err;
 
		console.log('Successfully connected');
 
});




/*Drop old collections
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