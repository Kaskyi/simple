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
simple.server = {};
simple.use = function(url, fn) {

}


simple.createServer = function(port, hostname, callback) {
    const server = http.createServer((req, res) => {
        this.handle(req, res);
    });
    server.listen(port, hostname, () => {
        callback();
    });
    simple.server = server;
}

simple.static = function static(path) {
        simple.staticRouter = Static(path);
        this.router.use('/+', simple.staticRouter.handle);
    }

    //TODO not correct each time add vars to req.simple
simple.handle = function handle(req, res) {

    var request = url.parse(req.url, true);

    simple.routeUrl = request.pathname;
  simple.req = req;
  simple.res = res;
    if (!req.simple) {
        req.simple = simple;
    }

    var hasResult = this.router.handle(req, res);
    if (!hasResult) {
        res.end('error');
    }
}

exports.Router = Router;
exports.Static = Static;
