// Dependencies
var express = require("express");
const session = require("express-session");
var mongojs = require("mongojs");
var logger = require("morgan");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 4420;
var app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded())
app.use(express.static("public"));
app.set("view engine", "ejs");

// Set the app up with Morgan
app.use(logger("dev"));

// Set the app up with bodyParser
app.use(bodyParser());

// Database configuration
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "puff_db"
});

var databaseUrl = process.env.MONGODB_URI || "puff_db";
var collections = ["puff"]

// Allow the API to be accused by other apps
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});

connection.connect();

app.listen(4420, function () {
    console.log("🌎 ==> Listening to 4420!");
})