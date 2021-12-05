var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
router.use(
    bodyParser.urlencoded({
      extended: true
    })
)
router.use(bodyParser.json());

/* Database connection */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/courses');
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function (callback) {
	console.log("Connected to db");

	//Create db scheme
	var courseSchema = mongoose.Schema( {
		courseId: String,
		courseName: String,
		coursePeriod: String,
	});

	//Create scheme model
	var Course = mongoose.model('Course', courseSchema);

	// Get all courses from db
	router.get('/', function(req, res, next) {

		Course.find(function(err, courses) {
			if(err) return console.error(err);  
			var jsonObj = JSON.stringify(courses);
			res.contentType('application/json');
			res.send(jsonObj);
		});
  	});
	  
	// Get course from db by Id
	router.get('/:id', function(req, res, next) {
		var id = req.params.id;

		Course.findOne({ "_id": id }, function(err, oneCourse) {
			if(err) return console.error(err);  
			var jsonObj = JSON.stringify(oneCourse);
			res.contentType('application/json');
			res.send(jsonObj);
		});
	});

	
	// Delete course from db by Id
	router.delete('/:id', function(req, res, next) {
		var id = req.params.id;

		Course.deleteOne({ "_id": id }, function (err) {
			if (err) return handleError(err);
		});

		Course.find(function(err, courses) {
			if(err) return console.error(err);  
			var jsonObj = JSON.stringify(courses);
			res.contentType('application/json');
			res.send(jsonObj);
		});
	});

	// Add course to db
	router.post('/', function(req, res, next) {
		
		var newCourse = new Course({ 
			courseId: req.body.courseId,
			courseName: req.body.courseName,
			coursePeriod: req.body.coursePeriod
		});	
	
		newCourse.save(function(err) {
			if(err) return console.error(err);
		});
	
		var jsonObj = JSON.stringify(newCourse);
		res.contentType('application/json');
		res.send(jsonObj);
	});
});

module.exports = router;
