const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slug = require('slug');
const User = mongoose.model('User');


const UnitSchema = new mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    title: String,
    description: String,
    milestones: [{
        video_file_url: String
    }],

}, {timestamps: true});

UnitSchema.plugin(uniqueValidator, {message: 'is already taken'});

UnitSchema.pre('validate', function(next){
    if(!this.slug)  {
        this.slugify();
    }
    next();
});

UnitSchema.methods.slugify = function() {
    this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

mongoose.model('Unit', UnitSchema);
