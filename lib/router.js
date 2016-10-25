var proto = module.exports = function() {
    function router() {
        router.init();
    }
    router.__proto__ = proto;
    router.urls = [];
    return router;
};

proto.init = function() {
    var self = this;
    var urls = self.urls;
}

proto.get = function(url, callback, next) {

}
proto.post = function(url, callback, next) {

}
proto.use = function use(url, callback) {
    var self = this;
    self.urls.push({
        key: url,
        value: callback
    });
}
proto.handle = function handle(req, res) {

    //SubString url's begin TODO: Make a class with Url's manipulations
    var url = req.simple.routeUrl;
    var currentUrl = url.substring(0, url.slice(1).indexOf('/') + 1);
    if (currentUrl == '') {
        currentUrl = url;
    }

    for (var key in this.urls) {
        var iter = this.urls[key];
        if (iter.key == currentUrl) {
            if (iter.value.__proto__ === proto) {
                //Url's end
                req.simple.routeUrl = url.substring(currentUrl.length, url.length);
                if (req.simple.routeUrl == '') {
                    req.simple.routeUrl = '/';
                }

                iter.value.handle(req, res);
            } else if (iter.value instanceof Function) {
                console.log(currentUrl);
                iter.value(req, res);
                return true;
            }
        }
    }
}
