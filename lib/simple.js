const http = require('http');
const url = require('url');
var Router = require('./router');
var Static = require('./static');
const Shortcuts = require('./shortcuts');
exports = module.exports = createApplication;

function mergeIn(a, b) {
    if (a && b) {
        for (var key in b) {
            a[key] = b[key];
        }
    }
    return a;
};

function createApplication() {
    var app = function() {};
    mergeIn(app, simple);
    return app;
}

var simple = {};
simple.router = Router();
simple.shortcuts = Shortcuts.apply(simple);
simple.req = {};
simple.res = {};

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

simple.createServer = function(port, hostname, callback) {
    //this.server =
    const server = http.createServer((req, res) => {
        this.handle(req, res);
    });
    server.listen(port, hostname, () => {
        callback();
    });
}

simple.static = function static(path) {
        simple.root = path;
        var loadStatic = function(req, res) {
            function callback(data) {
                var type = 'text/plain';
                var binary = false;
                var file = req.simple.routeUrl;
                if (endsWith(file, '.js')) {
                    type = 'text/javascript';
                } else if (endsWith(file, '.html')) {
                    type = 'text/html';
                } else if (endsWith(file, '.png')) {
                    type = 'image/png';
                    binary = true;
                } else if (endsWith(file, '.gif')) {
                    type = 'image/gif';
                    binary = true;
                } else {
                    return false;
                }

                res.writeHead(200, {
                    'Content-Type': type
                });

                if (binary) {
                    res.end(data, 'binary');
                } else {
                    res.end(data);
                }
            }
            callback(Static.loadFileAsync('.' + req.simple.routeUrl));
        }

        this.router.use('/static', loadStatic);
    }
    //TODO not correct each time add vars to req.simple
simple.handle = function handle(req, res) {

    var request = url.parse(req.url, true);
    simple.req = req;
    simple.res = res;
    if (!req.simple) {
        req.simple = simple;
    }

    req.simple.routeUrl = request.pathname;
    var hasResult = this.router.handle(req, res);
    if (!hasResult) {
        res.end('error');
    }
}

exports.Router = Router;
exports.Static = Static;
