var fs = require('fs'),
    path = require('path');

exports.writeOut = function (dest, content) {
    fs.writeFileSync(dest, content);
    console.log(dest + '\'s saved!');
}

exports.touchDir = function (dir) {
    if (!exports.isDirectory(dir)) {
        fs.mkdirSync(dir);
    }
}

exports.isDirectory = function (dir) {
    try {
        return fs.lstatSync(dir).isDirectory();
    }
    catch (e) {
    }
}

exports.read = function (path) {
    try {
        return fs.readFileSync(path);
    } catch (e) {
    }
}

exports.listFiles = function (dir, subfix) {

    var arr = fs.readdirSync(dir);
    //TODO
    var ret = [];

    for (var i = 0, max = arr.length; i < max; i++) {
        var fpath = arr[i];
        if (endsWith(fpath, subfix)) {
            ret.push(fpath);
        }
    }

    return  ret.length ? ret : null;
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, this.length - suffix.length) !== -1;
};

exports.deleteDir = function (dir) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

