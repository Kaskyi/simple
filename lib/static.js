const fs = require('fs');
const url = require('url');

var ContentTypes = [{
    key: "txt",
    type: "text/plain",
    binary: false
}, {
    key: "css",
    value: "text/css",
    binary: false
}, {
    key: "html",
    value: "text/html",
    binary: false
}];
var proto = {};
proto.root = '';

proto.handle = function(req, res, next) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        return next()
    }
    var contentType = ContentTypes[0];
    var file = proto.root + req.simple.routeUrl.slice(1);
    if (req.simple.routeUrl.slice(1) == '') {
        return false;
    }
    if (fileExist(file)) {
        console.log('FILE : ' + file);
        for (variable of ContentTypes) {
            if (endsWith(file, variable.key)) {
                contentType = variable.value;
            }
        }

        //TODO: change to sync
        var data = loadFileAsync(file);

        res.writeHead(200, {
            'Content-Type': contentType.type
        });

        if (contentType.binary) {
            res.end(data, 'binary');
        } else {
            res.end(data);
        }
    }
}

function fileExist(path) {
    try {
        fs.accessSync(path, fs.constants.R_OK);
    } catch (e) {
        console.error('Have not access to: ' + path);
        return false;
    }
    return true;
}

function loadFile(url, callback) {
    fs.open(url, 'r', (err, fd) => {
        if (err) {
            if (err.code === "ENOENT") {
                console.error('File does not exist' + url);
                return;
            } else {
                throw err;
            }
        }
        callback(fd);
    });
}

function loadFileAsync(path) {
    if (fileExist(path)) {
        return fs.readFileSync(path);
    }
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


//TODO: Made the file cash,root and  manage static files.
module.exports = function(root_path) {
    var staticRouter = function() {}
    proto.root = root_path;
    staticRouter.__proto__ = proto;
    return staticRouter;
}

module.exports.loadFile = loadFile;
module.exports.loadFileAsync = loadFileAsync;
