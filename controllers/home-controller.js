'use strict'
const router = require('express').Router()
const drinkGen = require('../models/cocktails');
const request = require('request')

router.get('/', (req,res)=>{
  res.render('index')
})


module.exports = router;
