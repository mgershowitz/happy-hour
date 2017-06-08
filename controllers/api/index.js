const express = require('express'),
  router = express.Router(),
  controller = require('./controller');

router.route('/quote')
  .get(controller.quote);

router.route('/drinks')
  .get(controller.drinks);

module.exports = router;
