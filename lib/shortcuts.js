const fs = require('fs');
const Static = require('./static');

function renderHTML(file_path) {
    file_path = this.staticRouter.root  + file_path;
    var data = Static.loadFileAsync(file_path);
    this.res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    this.res.write(data);
}

module.exports = function(simple) {

    var simple = simple ? simple : this;
    var shortcuts = function() {}
    shortcuts.renderHTML = renderHTML.bind(simple);
    return shortcuts;
}
