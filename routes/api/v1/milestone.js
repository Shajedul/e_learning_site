var router = require('express').Router();
var mongoose = require('mongoose');
var Course = mongoose.model('Course');
// var Milestone = mongoose.model('Milestone');
var Module = mongoose.model('Module');

router.post('/', async function(req, res, next) {

    return res.json({milestone: "asdasd"});


});


module.exports = router;
