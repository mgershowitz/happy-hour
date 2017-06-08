const express = require('express'),
  app = express(),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  methodOverride = require('method-override'),
  MongoStore = require('connect-mongo')(session),
  port = process.env.PORT || 3000;

require('dotenv').config();

app.use(session({
  isAuthorized: false,
  saveUninitialized: true,
  resave: true,
  secret: process.env.SECRET_KEY,
  cookie: {
    maxAge: 60000,
  },
  store: new MongoStore({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/sessions',
  }),
}));

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('/', require('./resources'));

app.listen(port, () => {
  console.log(`Server active on port: ${port}`);
});
