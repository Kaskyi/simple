var simple = require('../../../');
var router = simple.Router();
var Static = simple.Static;

router.use('/', function(req, res) {
    var data = Static.loadFileAsync('./static/index.html');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(data);
});

router.use('/me', function(req, res) {
    res.end('Hello someone');
});
module.exports = router;
