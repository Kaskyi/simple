var router = require('../../../').Router();
const levelRouter2 = require('./level2');

router.get('/', function(req, res) {
    res.end('level1');
});

router.use('/level2', levelRouter2);

module.exports = router;
