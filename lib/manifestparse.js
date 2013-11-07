#!/usr/bin/env node
var resource = require("./util/resource");

exports.parse = function (webapp, file) {

    webapp.appCache.data = resource.get(file);

    if( webapp.appCache.data){
        var networks = [];
        var source = webapp.appCache.data.data;
        var arr = source.split("\n");
        var start = false;
        for (var i = 0, max = arr.length; i < max; i++) {
            if (arr[i].indexOf("CACHE:") == 0) {
                start = true;
                continue;
            }
            if (start && arr[i] && (arr[i].indexOf("#") != 0)) {

                if (arr[i].indexOf("NETWORK:") == 0) {
                    break;
                }

                networks.push(arr[i]);
            }
        }

        webapp.appCache.network = webapp.appCache.network.concat(networks);
    }


    //TODO 增加唯一性检查？

    arr = [];
    arr.push("CACHE MANIFEST");
    arr.push("##"+new Date().getTime());
    arr.push("CACHE:")
    for (var i = 0, max = webapp.appCache.network.length; i < max; i++) {
        arr.push(webapp.appCache.network[i]);
    }
    arr.push("NETWORK:");
    arr.push("*");
    arr.push("FALLBACK:");

    webapp.appCache.source = arr.join("\r\n");

    return webapp;
}