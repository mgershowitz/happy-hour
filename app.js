'use strict'
const express        = require('express')
const app            = express()
const fs             = require('fs')
const path           = require('path')
const logger         = require('morgan')
const bodyParser     = require('body-parser')
const session        = require('express-session')
const methodOverride = require('method-override')
const request        = require('request');
const cheerio        = require('cheerio')
const homeController = require('./controllers/home-controller')
const userController = require('./controllers/user-controller')
const port           = process.env.PORT || 3000


// app.use(session({
//   saveUninitialized: true,
//   resave: true,
//   secret: "tacos!",
//   cookie: {maxAge:60000}
// }));

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, "/bower_components")));
app.use(logger('dev'));
// app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json())
app.use('/', homeController);
app.use('/user', userController)








app.listen(port, function(){
  console.log("Server active on port:", port);
})
