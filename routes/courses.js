const express = require('express');
const Course = require('../models/Course');
const router  = express.Router();

// Goes to the next middleware only if the user is a TA
function checkIsTA(req,res,next) {
  if (req.user && req.user.role === 'TA' ) {
    next()
  }
  else {
    res.redirect('/')
  }
}

// List of all courses
router.get('/', (req, res, next) => {
  Course.find()
  .then(courses => {
    res.render('courses/index', {courses}); // render the view /views/courses/index.hbs
  })
});

// Add of course
router.get('/add', checkIsTA, (req, res, next) => {
  res.render('courses/add');
});

router.post('/add', (req, res, next) => {
  const title = req.body.title
  const content = req.body.content
  Course.create({
    title,
    content,
  })
  .then(course => {
    res.redirect('/courses');
  })
});

router.get('/:id/delete', checkIsTA, (req, res, next) => {
  Course.findByIdAndRemove(req.params.id)
  .then(() => {
    res.redirect('/courses');
  })
});

module.exports = router;
