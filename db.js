const db = {
	hostname: "localhost",
	readUser: "readUser",
	readPass: "readPass",
	writeUser: "writeUser",
	writePass: "writePass",
};

const urls = {
	read: "mongodb://"+db.readUser+":"+db.readPass+"@"+db.hostname+"/MockTab",
	write: "mongodb://"+db.writeUser+":"+db.writePass+"@"+db.hostname+"/MockTab",
	setup: "mongodb://localhost/MockTab" //"mongodb://"+db.hostname+"/MockTab"
};

module.exports = urls;
