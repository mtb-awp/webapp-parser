#!/usr/bin/env node
var program = require('commander'),
    argv = process.argv;

require('colours');

//定义参数,以及参数内容的描述
program.version('0.0.1')
    .usage('在本地预览webapp平台build的效果，html+manifest')
    .option('-d, --dir <string>', 'output dir')
    .option('-u, --url <string>', 'webapp对应的h5根目录url,如 h5.m.taobao.com/yyz/')
    .option('-f, --files <string>', '需要build的文件列表,如 file1,file2,file3');

//添加额外的文档描述
program.on('*', function () {

    console.log(args);

});

//解析commandline arguments
program.parse(argv);
//console.log(program.name);
