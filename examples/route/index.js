const simple = require('../../');
const helloRouter = require('./routers/helloRouter');

const hostname = '127.0.0.1';
const port = 3000;
const app = simple();

//TODO: app.static(simple.static(root + '/static/'));
app.static(__dirname.split('\\').join('/') + '/static/');

app.router.use('/', function(req, res) {
    res.end('root');
});
app.router.use('/hello', helloRouter);

app.createServer(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
