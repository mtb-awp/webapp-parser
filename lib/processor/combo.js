/**
 * Created by wuzhong on 13-11-6.
 */
exports.process = function (webapp,file) {

    var html = webapp.pages[file].html;

    var regex = /<!--COMBO\:([\s\S]*?):COMBO-->/g;

    var matchs = regex.exec(html);

    if (!matchs) {
        return true;
    }

    var util = require('../util/util');

    while(matchs != null){

        var comboTag = util.genComboScript(matchs[0],webapp.comboUrl);

        html = html.replace(matchs[0],comboTag);

        matchs = regex.exec(html);
    }

    webapp.pages[file].html = html;
    return true;
}

function trim(s) {
    return s.replace(/\s+/g, ' ');
}
//
//<!--COMBO:webapp="mc"-->
//<script type="text/javascript" src="http://g.tbcdn.cn/mtb/zepto/1.0.2/zepto.js"></script>
//<script type="text/javascript" src="http://g.tbcdn.cn/mtb/lib-mtop/0.5.1/mtop.js"></script>
//<script type="text/javascript" src="http://g.tbcdn.cn/mtb/lib-login/0.2.3/login.js"></script>
//<script type="text/javascript" src="http://g.tbcdn.cn/mtb/lib-mtop/0.5.1/logined.js"></script>
//<!--:COMBO-->