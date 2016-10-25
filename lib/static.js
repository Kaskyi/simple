const fs = require('fs');
const url = require('url');

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

function loadFileAsync(url) {
    try {
        fs.accessSync(url, fs.constants.R_OK);
    } catch (e) {
        console.error('Have not access to: ' + url);
        return -1;
    }
    return fs.readFileSync(url);
}

//TODO: Made the file cash,root and  manage static files.
module.exports = function() {
    var stat = function() {}
    return stat;
}

module.exports.loadFile = loadFile;
module.exports.loadFileAsync = loadFileAsync;
