import urls from "db.js";
import MongoClient from "mongodb";

MongoClient.connect(urls.setup, function(err, db) {
    if (err) throw err;

    db.close();
});