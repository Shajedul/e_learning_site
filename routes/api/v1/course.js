var router = require('express').Router();
var mongoose = require('mongoose');

var Course = mongoose.model('Course');
var Milestone = require('../../../models/Milestone')


router.param('slug', function(req, res, next, slug) {
    Course.findOne({ slug: slug})
        .populate('milestones')
        .then(function (course) {
            if (!course) { return res.sendStatus(404); }
            req.course = course;

            return next();
        }).catch(next);
});

router.post('/', async function(req, res, next) {

    try{
        console.log(req.body)
        const course = await Course.create(req.body)
        console.log(course)
        return res.json({course: course.serialize(course)});
    }catch (e){
        return res.json({message: e.message});
    }


});

router.put('/:slug/assign_milestones', async function(req, res, next) {

    try{
        console.log(req.body)
        req.course.milestones = req.course.milestones.push(req.body)
        await req.course.save()
        return res.json({updated_course: req.course.serialize()});
    }catch (e){
        return res.json({message: e.message});

    }
});


module.exports = router;
