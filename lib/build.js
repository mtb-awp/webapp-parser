#!/usr/bin/env node

var fileUtil = require('./util/fileUtil'),
    pageparse = require("./pageparse"),
    manifestparse = require("./manifestparse");

exports.build = function (args) {

    var webapp = {
        pages: {
        },
        dependencys: {
            js: [],
            css: [],
            tms: []
        },
        appCache: {
            data: {},
            url: '',
            network: []
        },
        comboUrl:args.comboUrl||"http://g.tbcdn.cn"
    };

    //获取需要解析的file文件
    var dir = args.dir,
        files = null;
    if (fileUtil.isDirectory(dir)) {
        files = fileUtil.listFiles(dir, ".html");
    }
    if (!files && args.files) {
        files = args.files.split(",");
    }

    if (!files) {
        console.log("file is not found:" + args.dir);
        return;
    }

    //生成webapp树
    for (var i = 0, max = files.length; i < max; i++) {
        var file = dir + "/" + files[i];

        webapp.pages[file] = {};

        if (!pageparse.parse(webapp, file)) {
            return;
        }
    }

    //检测webapp和manifest
    if (webapp.appCache.url) {
        var manifestUrl = null;
        if (webapp.appCache.url.indexOf("http") !== 0) {
            manifestUrl = dir + "/" + webapp.appCache.url;
        } else {
            manifestUrl = webapp.appCache.url;
        }

        manifestparse.parse(webapp, manifestUrl);
    }


    //写到本地测试地址上
    var dest = args.dest;

    if (dest) {

        fileUtil.deleteDir(dest);

        fileUtil.touchDir(dest);

        if (webapp.appCache.url) {
            fileUtil.writeOut(dest + "/" + webapp.appCache.url, webapp.appCache.source);
        }

        for (var file in webapp.pages) {

            fileUtil.writeOut(dest + "/" + fileName(file), webapp.pages[file].html);

        }
    }

    console.log(webapp);
    return webapp;
}

function fileName(str) {
    var arr = str.split("/");
    return arr[arr.length - 1];
}
