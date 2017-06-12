const express = require('express'),
  router = express.Router(),
  controller = require('./controller');

router.route('/')
  .post(controller.create);

router.route('/save-drink')
  .post(controller.save);

router.route('/delete')
  .delete(controller.deleteDrink);

router.route('/new')
  .get(controller.new);

router.route('/login')
  .get(controller.login)
  .post(controller.process_login);

router.route('/logout')
  .post(controller.destroy);

router.route('/:id')
  .get(controller.show);

module.exports = router;
