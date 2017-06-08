const express = require('express'),
  router = express.Router(),
  controller = require('./controller');

router.route('/')
  .get(controller.index);


module.exports = router;
