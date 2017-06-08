const axios = require('axios'),
  { MongoClient } = require('mongodb'),
  dbConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/quotes',
  controller = {};

controller.quote = (req, res) => {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) throw err;
    db.collection('drinking')
    .find()
    .toArray((error, data) => {
      if (error) throw error;
      const i = Math.floor(Math.random() * data.length);
      res.json(data[i]);
    });
  });
};

controller.drinks = (req, res) => {
  return axios.get('http://addb.absolutdrinks.com/drinks/?apiKey=0f675859d1d941e385aa3d2f5bacbe8c&?start=0&pageSize=3000')
  .then((drinks) => {
    res.json(drinks.data.result);
  })
  .catch(err => res.send(err));
};

module.exports = controller;
