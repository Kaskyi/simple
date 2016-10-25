var router = require('../../../').Router();

router.use('/', function(req, res) {
    var shortcuts = req.simple.shortcuts;
    shortcuts.renderHTML('index.html');
    res.end('');
});

router.use('/me', function(req, res) {
    res.end('Hello someone');
});

module.exports = router;
