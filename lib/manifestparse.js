#!/usr/bin/env node
var resource = require("./util/resource");

exports.parse = function (webapp,file) {

    webapp.pages[file].source = resource.get(file);

    webapp.pages[file].html = webapp.pages[file].source.data;

    var processors = [];

    processors.push(require("./processor/manifest"));
    processors.push(require("./processor/httpheader"));
    processors.push(require("./processor/tms"));
    processors.push(require("./processor/combo"));
    processors.push(require("./processor/webapp"));

    for (var i= 0,max = processors.length; i<max; i++) {

        var Processor =  processors[i];

        if (!Processor.process(webapp,file)) {
            return false;
        }
    }
    return webapp;
}