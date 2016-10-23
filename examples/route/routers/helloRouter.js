var simple = require('../../../');

var router = simple.Router();
var Static = simple.Static;

router.use('/', function(req, res) {
  console.log(simple.Static);
  //TODO: simplify 
    var data = Static.loadFileAsync(simple.Static.root+'index.html');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(data);
});

router.use('/me', function(req, res) {
    res.end('Hello someone');
});
module.exports = router;
