var router = require('../../../').Router();
const levelRouter2 = require('./level2');

router.get('/', function(req, res) {
    res.end('level2');
});

router.use('/level3',  function(req, res) {
    res.end('level3');
});

module.exports = router;
