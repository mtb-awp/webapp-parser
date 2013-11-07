/**
 * Created by wuzhong on 13-11-6.
 */
var main = require("../lib/build");

//var content = main.build({
//    dir: "http://lu.m.taobao.com/github/webapp-parser/test/example/",
//    files:"demo.html,demo2.html",
//    dest: './dest'});
//console.log(content);
var content = main.build({dir:"./detail",'dest':'./dest_detail'});
console.log(content);