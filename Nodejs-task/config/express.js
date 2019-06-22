const express = require("express");
const bodyParser = require("body-parser");

module.exports = function() {
    console.log("irfan express0");
    var app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    console.log("irfan express");
   
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
        next();
    });
    var routes = require("../app/routes.js");
    routes(app);
    return app;
}