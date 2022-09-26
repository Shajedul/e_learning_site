const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const uniqueArrayPlugin = require('mongoose-unique-array');
const slug = require('slug');
const User = mongoose.model('User');
const MilestoneSchema = require('./Milestone');



const CourseSchema = new mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true, },
    title: String,
    description: String,
    milestones: [MilestoneSchema],
}, {timestamps: true});

CourseSchema.plugin(uniqueValidator, {message: 'is already taken'});


CourseSchema.pre('validate', function(next){
    if(!this.slug)  {
        this.slugify();
    }

    next();
});

CourseSchema.methods.slugify = function() {
    this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

CourseSchema.methods.serialize = function(payload){

    return {
        slug: this.slug,
        title: this.title,
        description: this.description,
        milestones: this.milestones
    };



};

mongoose.model('Course', CourseSchema);
