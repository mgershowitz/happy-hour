'use strict'
const router   = require('express').Router()
const request  = require('request')
const quotes   = require('../models/quotes')
const drinkGen = require('../models/cocktails')


router.get('/quote', quotes.quote, (req,res)=>{
  res.send({quote:res.quote,author:res.author})
})

router.get('/drinks', (req,res)=>{
  request({
    url:'http://addb.absolutdrinks.com/drinks/?apiKey=0f675859d1d941e385aa3d2f5bacbe8c&?start=0&pageSize=3000',
    method:'get',
    json:true
  },(err,result,body)=>{
    if (err) throw err;
  res.json(body.result)
  })
})

module.exports = router;
