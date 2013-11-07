/**
 * Created by wuzhong on 13-11-6.
 */
/**
 * Created by wuzhong on 13-11-6.
 */
var util = require("../util/util"),
    resource = require("../util/resource");

exports.process = function (webapp,file) {

    //crc   //appcache

    buildScript(webapp,file);

    buildCss(webapp,file);

    return true;

}

function buildScript(webapp,file) {

    var html = webapp.pages[file].html;
    var scripts = util.getScipts(html);

    scripts.forEach(function (s) {
        var prop = util.getWebappAttr(s),
            url = util.getScriptUrl(s),
            res = resource.get(url),
            newUrl = url;
        if (prop.indexOf("i") >= 0) {
            //内敛
            var arr = ["<script>"];
            arr.push(res.data);
            arr.push("</script>");
            html = html.replace(s, arr.join(""));
        } else if (prop.indexOf("m") >= 0) {
            //monitor
            newUrl = (url + "?v=" + res.crc32 + "_" + res.length);
        }
        if (prop.indexOf("c") >= 0) {
            //cache
            webapp.appCache.push(newUrl);
        } else {
            webapp.dependencys.js.push(newUrl);
        }
        newUrl && (html = html.replace(url, newUrl));
    });

    webapp.pages[file].html = html;

}

function buildCss(webapp,file) {

    var html = webapp.pages[file].html;

    var csses = util.getCsses(html);

    csses.forEach(function (s) {
        var prop = util.getWebappAttr(s),
            url = util.getCssUrl(s),
            res = resource.get(url),
            newUrl = url;
        if (prop.indexOf("i") >= 0) {
            //内敛
            var arr = ["<style>"];
            arr.push(res.data);
            arr.push("</style>");
            html = html.replace(s, arr.join(""));
        } else if (prop.indexOf("m") >= 0) {
            //monitor
            newUrl = (url + "?v=" + res.crc32 + "_" + res.length);
        }
        if (prop.indexOf("c") >= 0) {
            //cache
            webapp.appCache.push(newUrl);
        } else {
            webapp.dependencys.css.push(newUrl);
        }
        newUrl && (html = html.replace(url, newUrl));
    });

    webapp.pages[file].html = html;

}
