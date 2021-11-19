var express = require('express');
var router = express.Router();

var courses = [{"_id":1,"courseId":"DT162G","courseName":"Javascript-baserad webbutveckling","coursePeriod":1},
{"_id":2,"courseId":"IK060G","courseName":"Projektledning","coursePeriod":1},
{"_id":3,"courseId":"DT071G","courseName":"Programmering i C#.NET","coursePeriod":2},
{"_id":4,"courseId":"DT148G","courseName":"Webbutveckling för mobila enheter","coursePeriod":2},
{"_id":5,"courseId":"DT102G","courseName":"ASP.NET med C#","coursePeriod":3},
{"_id":6,"courseId":"IG021G","courseName":"Affärsplaner och kommersialisering","coursePeriod":3},
{"_id":7,"courseId":"DT069G","courseName":"Multimedia för webben","coursePeriod":4},
{"_id":8,"courseId":"DT080G","courseName":"Självständigt arbete","coursePeriod":4}];

/* GET all courses */
router.get('/', function(req, res, next) {
  var jsonObj = JSON.stringify(courses);
  res.contentType('application/json');
  res.send(jsonObj);
});

/* GET course by ID */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var index = -1;

	for(var i=0; i < courses.length; i++){
		if(courses[i]._id == id) index = i;
	} 
	res.contentType('application/json');
	res.send(index>=0?courses[index]:'{}');
});

/* DELETE course by ID */
router.delete('/:id', function(req, res, next) {
	var id = req.params.id;
	var del=-1;

	for(var i=0; i < courses.length; i++){
		if(courses[i]._id == id) del = i;
	} 
	if(del>=0) status=courses.splice(del, 1);

	res.contentType('application/json');
	res.send(id);
});

module.exports = router;
