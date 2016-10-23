const http = require('http');
const simple = require('../../');
var app = simple();

var helloRouter = require('./routers/helloRouter');

const hostname = '127.0.0.1';
const port = 3000;

app.static(__dirname.split('\\').join('/') + '/static/');

app.router.use('/', function(req, res) {
    res.end('root');
});
app.router.use('/hello', helloRouter);


const server = http.createServer((req, res) => {
    app.listener(req, res);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
