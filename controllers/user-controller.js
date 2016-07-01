'use strict'
const router = require('express').Router();
const quotes = require('../models/quotes');

router.get('/', quotes.quote, (req,res)=>{
  res.render('user', {quote:res.quote, author:res.author})
})


module.exports = router;
