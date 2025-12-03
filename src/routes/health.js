const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });

});
router.get('/', (req, res) => {
    res.json({status: 'ok '});
});

module.exports = router