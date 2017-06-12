const bcrypt = require('bcrypt'),

  db = require('../config/database'),

  User = {};

User.findByUsername = (user) => {
  return db.oneOrNone(`
      SELECT * FROM users
      WHERE username = $1
  `, user);
};

User.create = (user) => {
  user.password = bcrypt.hashSync(user.password, 10);

  return db.one(`
    INSERT INTO users
    (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [user.username, user.email, user.password]);
};

User.findById = (user_id) => {
  return db.manyOrNone(`
      SELECT * FROM favorite_drinks
      JOIN users
      ON users.id = favorite_drinks.user_id
      WHERE user_id = 3;
  `, user_id);
};

User.saveDrink = (user, drink) => {
  return db.one(`
    INSERT INTO favorite_drinks
    (name, description, ingredients, image, user_id)
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING *;`, [drink.name, drink.desc, drink.ingredients, drink.image, user]);
};

User.deleteDrink = (user, drink) => {
  return db.none(`
    DELETE FROM favorite_drinks
    WHERE user_id = $1
    AND id = $2;`, [user, drink]);
};

module.exports = User;

