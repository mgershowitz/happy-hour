const User = require('../../models/user'),
  bcrypt = require('bcrypt'),
  controller = {};

controller.new = (req, res) => {
  res.render('user/new');
};

controller.login = (req, res) => {
  res.render('user/login');
};

controller.create = (req, res) => {
  User.create(req.body.user)
  .then(() => {
    res.redirect('/users/login');
  })
  .catch((err) => {
    res.send(err);
  });
};

controller.process_login = (req, res) => {
  User.findByUsername(req.body.user.username)
  .then((user) => {
    if (user) {
      if (bcrypt.compareSync(req.body.user.password, user.password)) {
        req.session.user = user;
        req.session.isAuthenticated = true;
        res.redirect(`/users/${user.id}`);
      } else {
        res.redirect('/users/login');
      }
    } else {
      res.redirect('/users/login');
    }
  })
  .catch((err) => {
    res.send(err);
  });
};

controller.show = (req, res) => {
  User.findById(req.session.user.id)
  .then((user) => {
    res.render('user/user', { user, userId: req.session.user });
  });
};

controller.destroy = (req, res) => {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect('/');
};

controller.save = (req, res) => {
  User.saveDrink(req.session.user.id, req.body)
  .then(() => res.send('success'))
  .catch(err => res.send(err));
};

controller.deleteDrink = (req, res) => {
  console.log(req.body.drink.id);
  User.deleteDrink(req.session.user.id, req.body.drink.id)
  .then(() => res.redirect(`/users/${req.session.user.id}`));
};

module.exports = controller;
