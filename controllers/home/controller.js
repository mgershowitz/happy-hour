const controller = {};

controller.index = (req, res) => {
  res.render('index', { user: req.session.user });
};

module.exports = controller;
