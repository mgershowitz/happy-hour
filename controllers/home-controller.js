'use strict'
const router = require('express').Router()
const drinkGen = require('../models/cocktails');
const request = require('request')
const {saveDrink} = require('../models/user')

router.get('/', (req,res)=>{
  res.render('index', {user: req.session.user})
})

router.post('/', saveDrink, (req,res) => {
});


module.exports = router;
