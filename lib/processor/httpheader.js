/**
 * Created by wuzhong on 13-11-6.
 */
exports.process = function (webapp,file) {

    var html = webapp.pages[file].html;

    var regex = /<!--HTTP-HEAD:(.*)?:HTTP-HEAD-->/;

    var matchs = html.match(regex);

    if (!matchs) {
        return true;
    }

    webapp.pages[file].html = html.replace(matchs[0], "");

    var headers = matchs[1];

    var arr = headers.split(",");

    webapp.pages[file].httpHeader = {};

    for (var i = 0, max = arr.length; i < max; i++) {

        var line = arr[i];
        var kv = line.split(":");

        webapp.pages[file].httpHeader[trim(kv[0])] = trim(kv[1]);
    }

    return true;

}

function trim(s) {
    return s.replace(/\s+/g, ' ');
}


