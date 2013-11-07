/**
 * Created by wuzhong on 13-11-6.
 */
exports.process = function(webapp,file){

    var html = webapp.pages[file].html;

    var regex = /<html[^>]+manifest=["']([^"']*)["']/;

    var matchs = html.match(regex);

    if(matchs){
        var manifestUrl = matchs[1];
        webapp.appCache.url = manifestUrl;
    }
//    html.replace(regex,function(str){
//          console.log(str);
//    })

    return true;

}
