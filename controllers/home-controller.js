'use strict'
const router = require('express').Router()

router.get('/', function(req,res) {
  // res.render('index', {user: req.session.user})
  res.render('index')
});


module.exports = router;
