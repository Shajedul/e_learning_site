var router = require('express').Router();
var mongoose = require('mongoose');
var Course = mongoose.model('Module');
// var Milestone = mongoose.model('Milestone');
var Unit = mongoose.model('Unit');

router.post('/', async function(req, res, next) {

    return res.json({modules: "asdasd"});


});


module.exports = router;
