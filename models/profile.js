'use strict'
const {MongoClient} = require('mongodb')
const dbConnection  = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/happy_hour'

module.exports = {
user: (req, res, next)=> {
  MongoClient.connect(dbConnection, (err, db) =>{
    if (err) throw err

    db.collection('users')
      .find()
      .toArray((err,data)=>{
        if (err) throw err
        res.users = data;
      next();
      })
    })
  }
}
