/**
 * Created by wuzhong on 13-11-6.
 */
var main = require("../lib/build");

var content = main.build({
    dir: "http://lu.m.taobao.com/github/webapp-parser/test/example/",
    files:"demo.html,demo2.html",
    dest: './dest'});
console.log(content);


var content2 = main.build({dir:"./example",'dest':'./dest2'});
console.log(content2);