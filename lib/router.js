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

//TODO:Replace to RegEx
proto.handle = function handle(req, res) {

    var url = req.simple.routeUrl;
    var currentUrl = url.substring(0, url.slice(1).indexOf('/') + 1);
    if (currentUrl == '') {
        currentUrl = url;
    }
    console.log('Current ulr : ' + currentUrl);
    for (var key in this.urls) {
        var iter = this.urls[key];
        var has = false;
        if (iter.key.charAt(iter.key.length - 1) == '+') {
            if (currentUrl.indexOf(iter.key.slice(0, 1)) !== -1) {
                has = true;
            }
        }
        if (has || iter.key === currentUrl) {

            has = false;
            if (iter.value.__proto__ === proto) {
                //Url's end
                req.simple.routeUrl = url.substring(currentUrl.length, url.length);
                if (req.simple.routeUrl == '') {
                    req.simple.routeUrl = '/';
                }
                iter.value.handle(req, res);

            } else if (iter.value instanceof Function) {
                iter.value(req, res);
                if (res.finished) {
                    return true;
                }
            }

        }
    }
}
