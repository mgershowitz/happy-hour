'use strict'
const router                  = require('express').Router();
const users                   = require('../models/profile')
const {createUser, loginUser} = require('../models/user')



router.get('/profile/:uName', users.user, (req,res) => {
  const filterByUName = res.users.filter((profile) => {
    return profile.uName == req.params.uName
  })
  res.render('user/user', {user:filterByUName})
})

router.get('/new', (req,res) => {
  res.render('user/new', {user: req.session.user});
});

router.post('/new', createUser, loginUser, (req,res) => {
  req.session.user = res.user;
  req.session.save((err) => {
    if (err) throw err
    res.redirect('/');
  });
});

router.get('/login', (req,res) => {
  res.render('user/login', {user: req.session.user});
});

router.post('/login', loginUser, (req,res) => {
  req.session.user = res.user;
  req.session.save((err) => {
    if (err) throw err
    res.redirect('/');
  });
});

router.delete('/logout', (req,res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  })
})

module.exports = router;
