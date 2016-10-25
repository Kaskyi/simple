const simple = require('../../');
const levelRouter1 = require('./routers/level1');

const hostname = '127.0.0.1';
const port = 3000;
const app = simple();

app.static(__dirname.split('\\').join('/') + '/static/');

app.use('/', function(req, res) {
    res.end('root');
});
app.router.use('/level1', levelRouter1);

/*app.error(404,function(req, res) {
    res.end('404');
});
*/
app.createServer(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
