const express = require('express'),
  router = express.Router();

router.use('/users', require('./controllers/users'));
router.use('/api', require('./controllers/api'));
router.use('/', require('./controllers/home'));


module.exports = router;
