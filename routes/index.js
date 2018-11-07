const express = require('express');
const User = require('../models/User');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/employees', (req,res,next) => {
  User.find()
  .then(users => {
    res.render('employees', {users})
  })
})

function checkIsBoss(req,res,next) {
  // OR if (res.locals.isBoss)
  if (req.user && req.user.role === 'Boss') {
    next()
  }
  else {
    res.redirect('/')
  }
}

router.get('/users/:id/delete', checkIsBoss, (req,res,next) => {
  User.findByIdAndRemove(req.params.id)
  .then(user => {
    res.redirect('/employees')
  })
})


module.exports = router;
