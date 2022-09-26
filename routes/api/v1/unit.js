var router = require('express').Router();
var mongoose = require('mongoose');
var Unit = mongoose.model('Unit');
var Module = mongoose.model('Module');

router.post('/', async function(req, res, next) {

    return res.json({unit: "asdasd"});


});


module.exports = router;
