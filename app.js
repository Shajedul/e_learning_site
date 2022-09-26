var
    bodyParser = require('body-parser')
    express = require('express'),
    mongoose = require('mongoose');

var isProduction = process.env.NODE_ENV === 'production';

// Create global app object
var app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/eschool');
mongoose.set('debug', true);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
    return;
});
app.use(require('method-override')());
require('./models/User');
require('./models/Course');
require('./models/Module');
require('./models/Unit');

app.use(require('./routes'));

// finally, let's start our server...
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});


async function run(){
    console.log("asdasd")
    delete mongoose.connection.models['Milestone'];
    //
    // try {
    //     const Course = mongoose.model('Course')
    //     console.log("asdasd")
    //     const temp = await Course.find({})
    //     console.log("asdasd1")
    //     console.log(temp)
    //     await Course.find({}).deleteMany()
    //     console.log("asdasd")
    //     console.log(await Course.find({}))
    //     console.log("asdasd")
    // }catch (e){
    //     console.log(e)
    // }

    // try {
    //
    //
    //     const course = await Course.create({
    //         title: "Test Course",
    //         description: "Course description",
    //         milestones: ['62e6f6626b496190da079a84', '62e6f6626b496190da079a8c']
    //
    //     })
    //     console.log(course)
    //     }catch (e) {
    //
    // }
}
run();
