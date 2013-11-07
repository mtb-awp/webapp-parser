#!/usr/bin/env node
var program = require('commander'),
    argv = process.argv;

require('colours');

//定义参数,以及参数内容的描述
program.version('0.0.1')
    .usage('在本地预览webapp平台build的效果，html+manifest')
    .option('-o, --dest <string>', 'output dir')
    .option('-d, --dir <string>', 'base url, 资源对应的基准目录')
    .option('-f, --files <string>', '需要build的文件列表,如 file1,file2,file3');

//添加额外的文档描述

//解析commandline arguments
program.parse(process.argv);

require("../lib/build").build(program);


