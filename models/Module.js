const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slug = require('slug');

const ModuleSchema = new mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    title: String,
    description: String,
    prev_module: [{
        type: String,
        ref: 'Module'
    }],
    units: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }],
    milestone_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }

}, {timestamps: true});

ModuleSchema.plugin(uniqueValidator, {message: 'is already taken'});


ModuleSchema.pre('validate', function(next){
    if(!this.slug)  {
        this.slugify();
    }
    next();
});

ModuleSchema.methods.slugify = function() {
    this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

mongoose.model('Module', ModuleSchema);
