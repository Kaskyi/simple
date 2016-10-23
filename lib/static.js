const fs = require('fs');
const url = require('url');
var root = '';
/*
// ToDO, if url  = /static/index.html then files url =   /static/static/..png ,
//Solution remove all 'static' from html and add urls to the root router
*/
function loadFile(url, callback) {
    url = root + url;
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
    url = root + url;
    try {
        fs.accessSync(url, fs.constants.R_OK);
    } catch (e) {
        console.error('Have not access to: ' + url);
        return -1;
    }
    return fs.readFileSync(url);
}


module.exports.root = loadFile;
module.exports.loadFile = loadFile;
module.exports.loadFileAsync = loadFileAsync;
