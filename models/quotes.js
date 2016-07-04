'use strict'
const {MongoClient} = require('mongodb')
const dbConnection  = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/quotes'

module.exports = {
quote: (req, res, next)=> {
  MongoClient.connect(dbConnection, (err, db) =>{
    if (err) throw err

    db.collection('drinking')
      .find()
      .toArray((err,data)=>{
        if (err) throw err
        const i = Math.floor(Math.random()*data.length)
        res.quote = data[i].quote;
        res.author = data[i].author;
      next();
      })
    })
  }
}
