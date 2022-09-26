var router = require('express').Router();

router.use('/courses', require('./course'));
router.use('/milestones', require('./milestone'));
router.use('/modules', require('./module'));
router.use('/units', require('./unit'));

module.exports = router;
