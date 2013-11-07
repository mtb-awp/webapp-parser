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
        appCache: []
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
        return;
    }

    //生成webapp树
    for (var i = 0, max = files.length; i < max; i++) {
        var file = files[i];

        webapp.pages[file] = {};

        if (!pageparse.parse(webapp, file)) {
            return;
        }
    }

    console.log(webapp);

    //检测webapp和manifest
    if (webapp.appCache.url) {
        var manifestUrl = null;
        if (webapp.appCache.url.indexOf("http") == 0) {
            manifestUrl = dir + "/" + webapp.appCache.url;
        } else {
            manifestUrl = webapp.appCache.url;
        }

        console.log(manifestUrl);
    }





    //写到本地测试地址上


//    var pageDo = require("./pageparse").parse(pageDo);
//
//    if (pageDo) {
//
//        console.log("hello here")
//        var dest = path.join(path.dirname(fs.realpathSync(__filename)), "../dest/test.html");
//        writeOut(dest, pageDo.html.product);
//
////        require("./").parse(url);
//
//
//    }


}
