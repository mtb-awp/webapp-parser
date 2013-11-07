var crc32 = require('buffer-crc32');

exports.get = function (url) {

    try{
    if(url.indexOf("http") === 0){
        return httpGet(url);
    }

    return localRead(url);
    }catch (e){}

};

function httpGet(url){
    var httpsync = require('httpsync');

    try{
        var content = httpsync.get(url).end().data;
        return wrap(content);
    }catch (e){
        console.log("url :" + url +" not exists");
    }
}

function wrap(content){
    return {
        data : content.toString(),
        length : content.length,
        crc32 : crc32.unsigned(content.toString())
    }
}

function localRead(dir){

    var fs = require('fs');
    var content = fs.readFileSync(dir);

    return wrap(content);

}