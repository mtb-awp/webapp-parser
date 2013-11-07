/**
 * Created by wuzhong on 13-11-6.
 */
exports.genComboScript = function (content,comboUrl) {

    var webappProps = exports.getWebappAttr(content),
        urls = exports.getSciptsUrl(content);

    if (urls.length) {
        var arr = [];
        urls.forEach(function (url) {
            var url = (url.replace("http://a.tbcdn.cn/g", comboUrl));

            if (url.indexOf(comboUrl) == 0) {
                arr.push(url.replace(comboUrl, ""));
            } else {
                throw("can't combo : " + url);
            }
        });

        var comboUrl = comboUrl + "??" + arr.join(",")

        return "<script src='" + comboUrl + "' webapp='" + webappProps + "' ></script>"
    }
};

exports.getScriptUrl = function (s) {
    var jsregex = /src=["']([^"']*?)["']/,
        matchs = jsregex.exec(s);
    return matchs[1];
}

exports.getCssUrl = function (s) {
    var cssregex = /href=["']([^"']*?)["']/,
        matchs = cssregex.exec(s);
    return matchs[1];
}

exports.getWebappAttr = function (s) {
    var webappregex = /webapp=["']([^"']+?)["']/,
        matchs = webappregex.exec(s);
    return matchs[1];
}

exports.getSciptsUrl = function (content) {
    var jsregex = /src=["']([^"']*?)["']/g,
        matchs = jsregex.exec(content),
        urls = [];

    while (matchs != null) {
        urls.push(matchs[1]);
        matchs = jsregex.exec(content);
    }

    return urls;
}

exports.getScipts = function (content) {
    var jsregex = /<script[^>]+webapp=["']([^"']+)["'][\s\S]*?<\/script>/g,
        matchs = jsregex.exec(content),
        urls = [];

    while (matchs != null) {
        urls.push(matchs[0]);
        matchs = jsregex.exec(content);
    }
    return urls;
}

exports.getCsses = function (content) {
    var cssregex = /<link[^>]+webapp=["']([^"']+)["'][\s\S]*?>/g,
        matchs = cssregex.exec(content),
        urls = [];

    while (matchs != null) {
        urls.push(matchs[0]);
        matchs = cssregex.exec(content);
    }
    return urls;
}


//var content = '<!--COMBO:webapp="mc"-->\r\n' +
//    '<script type="text/javascript" src="http://g.tbcdn.cn/mtb/lib-mtop/0.5.1/mtop.js"></script>' +
//    '<script type="text/javascript" src="http://g.tbcdn.cn/mtb/lib-login/0.2.3/login.js"></script>' +
//    '<script type="text/javascript" src="http://g.tbcdn.cn/mtb/lib-mtop/0.5.1/logined.js"></script>' +
//    '<!--:COMBO-->';
//
//var urls = exports.genComboScript(content)
//console.log(urls);