/**
 * Created by wuzhong on 13-11-6.
 */
var main = require("../lib/build");

var content = main.build({dir:"./example",'dest':'./dest'});

console.log(content);