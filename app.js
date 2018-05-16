const http = require("http");
const express = require("express");
const PORT = 8080;

var app = express();

http.createServer(app).listen(PORT);

app.get("/hello", function (req, res) {
    res.send("Hello World!");
});

app.get("/team/:number")