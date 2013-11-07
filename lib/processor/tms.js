/**
 * Created by wuzhong on 13-11-6.
 */
exports.process = function (webapp,file) {

    var html = webapp.pages[file].html;

    var regex = /<!--TMS:(.*)?:TMS-->/g;

    var matchs = html.match(regex);

    if (!matchs) {
        return true;
    }

    var resource = require("../util/resource"),
        tmsFils = [];

    for (var i = 0, max = matchs.length; i < max; i++) {

        var tmsUrl = "http://h5.m.taobao.com/channel" + matchs[i].match(/<!--TMS:(.*)?:TMS-->/)[1];

        var tmsContent = resource.get(tmsUrl).data;

        html = html.replace(matchs[i], tmsContent);

        tmsFils.push(tmsUrl);
    }

    webapp.pages[file].html = html;

    webapp.dependencys['tms'] = webapp.dependencys['tms'].concat(tmsFils);

    return true;
}

function trim(s) {
    return s.replace(/\s+/g, ' ');
}