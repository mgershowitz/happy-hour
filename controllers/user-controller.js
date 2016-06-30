const router = require('express').Router();
const quotes = require('../quotes');

router.get('/', function(req,res) {
  let i      = Math.floor(Math.random()*quotes.length)
  let quote  = quotes[i].quote;
  let author = quotes[i].author;
  res.send({quote:quote,author})
  console.log(i)
})


module.exports = router;
