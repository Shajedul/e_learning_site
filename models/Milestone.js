const mongoose = require('mongoose');
const slug = require("slug");
const uniqueArrayPlugin = require('mongoose-unique-array');
const uniqueValidator = require("mongoose-unique-validator");

const MileStonesSchema = new mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    title: String,
    description: String,
    modules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
    }],
}, {timestamps: true});
MileStonesSchema.plugin(uniqueValidator, {message: 'is already taken'});



MileStonesSchema.pre('validate', function(next){
    if(!this.slug)  {
        this.slugify();
    }

    next();
});

MileStonesSchema.methods.serialize = function(payload){
    return {
        slug: this.slug,
        title: this.title,
        description: this.description,
        modules: this.modules,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};


MileStonesSchema.methods.slugify = function() {
    this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};
// mongoose.model('Milestone', MileStonesSchema);
module.exports = MileStonesSchema;





