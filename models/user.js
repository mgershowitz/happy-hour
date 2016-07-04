'use strict'
const {MongoClient} = require('mongodb')
const dbConnection  = 'mongodb://localhost:27017/happy_hour';
const bcrypt        = require('bcrypt')
const salt          = bcrypt.genSalt(10);

let createSecure = (uName, password, callback) => {
  bcrypt.genSalt((err, salt) => {
    bcrypt.hash(password,salt, (err, hash) => {
      callback(uName,hash);
    })
  })
}

let createUser = (req,res,next) => {
  createSecure(req.body.uName, req.body.password, saveUser)
  function saveUser(uName, hash) {
    MongoClient.connect(dbConnection, (err, db) => {
      let userInfo = {
        uName: uName,
        passwordDigest: hash,
        drinks: ""
      }
      db.collection('users').insertOne(userInfo, (err, results) => {
        if(err) throw err;
        next()
      });
    });
  }
}

let loginUser = (req,res,next) => {
  let uName = req.body.uName;
  let password = req.body.password;

  MongoClient.connect(dbConnection, (err, db) => {
    db.collection('users')
      .findOne({"uName":uName}, (err, user) => {
      if (err) throw err
      if (user === null) {
        console.log("can't find user with name",uName)
      } else if (bcrypt.compareSync(password, user.passwordDigest)) {
        console.log("signed in",uName)
        res.user = user;
      }
      next();
    })
  })
}

// let saveDrink = (req,res,next) => {
//     MongoClient.connect(dbConnection, (err, db) => {
//       let userInfo = {
//         uName: uName,
//         passwordDigest: hash
//       }
//       db.collection('users').insertOne(userInfo, (err, results) => {
//         if(err) throw err;
//         next()
//       });
//     });
//   }
// }

module.exports = {createUser, loginUser}


