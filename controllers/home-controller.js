'use strict'
const router = require('express').Router()
const drinkGen = require('../models/cocktails');
const request = require('request')

router.get('/', (req,res)=>{
  res.render('index')
})

router.get('/random',  (req,res)=>{
  request({
    url:'http://www.thecocktaildb.com/api/json/v1/1/random.php',
    method:'get',
    json:true
  },(err,result,body)=>{
    if (err) throw err;
  res.json(body.drinks[0])
  })
})


module.exports = router;
