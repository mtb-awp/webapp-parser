#!/usr/bin/env node
var express = require('express'),
    build = require('../lib/build');

exports.startServer = function (program) {

    var app = express();

    var port = program.port || 80;

    app.get('/parse.do', function (req, res) {

        console.log(req.query);

        var webapp = build.build(req.query);

        console.log(webapp);

        res.send(webapp);

    });

    app.listen(port);

    console.log("Server running at http://127.0.0.1:" + port);

}

exports.startServer({port: 8081});