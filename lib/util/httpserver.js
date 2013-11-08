#!/usr/bin/env node

var express = require('express'),
    build = require('../build'),
    app = express(),
    port = 8081;

app.get('/parse.do', function (req, res) {

    console.log(req.query);

    var webapp = build.build(req.query);

    console.log(webapp);

    res.send(webapp);

});

app.listen(port);

console.log("Server running at http://127.0.0.1:" + port);
