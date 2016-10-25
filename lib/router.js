var proto = module.exports = function() {
    function router() {
        router.init();
    }
    router.__proto__ = proto;
    router.urls = [];
    return router;
};

proto.init = function() {
    var urls = this.urls;
}

proto.get = function(url, callback, next) {
    this.urls.push({
        key: url,
        value: callback,
        method: 'GET',
        next: next
    });
}
proto.post = function(url, callback, next) {
    this.urls.push({
        key: url,
        value: callback,
        method: 'POST',
        next: next
    });
}
proto.use = function(url, callback, next) {
    this.urls.push({
        key: url,
        value: callback,
        method: 'GET',
        next: next
    });
}

//TODO:Replace to RegEx
proto.handle = function handle(req, res, next) {


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
                if (req.method === iter.method) {
                    iter.value.handle(req, res, iter.next);
                }

            } else if (iter.value instanceof Function) {
                if (req.method === iter.method) {
                    console.log(iter.method + " : " + currentUrl);
                    iter.value(req, res, iter.next);
                }
                if (res.finished) {
                    return true;
                }
            }

        }
    }
}
