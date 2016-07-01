'use strict'
const router = require('express').Router()
const drinkGen = require('../models/cocktails');

router.get('/',  (req,res)=>{
  // res.render('index', {user: req.session.user})
  res.render('index')
});


module.exports = router;
