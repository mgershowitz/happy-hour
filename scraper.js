'use strict'
const express        = require('express')
const fs             = require('fs')
const path           = require('path')
const logger         = require('morgan')
const bodyParser     = require('body-parser')
const request        = require('request');
const cheerio        = require('cheerio')
const app            = express()
const port           = process.env.PORT || 3000


app.set('view engine', 'ejs');
app.use(logger('dev'));
// app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json())

app.get('/scrape', function(req, res){

const url = 'https://www.goodreads.com/quotes/tag/drinking';

request(url, function(error, response, html){
    if(!error){
    var $ = cheerio.load(html);
    var quote;
    var json = { quote : ""};
    for(let i = 0 ; i < $('.quoteText').length; i++){

         $('.quoteText').eq(i).filter(function(){
            var data = $(this);
            quote = data.text();

            json.quote = quote;

        })
    }
  }


fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

res.send('Check console!')

    });
})






app.listen(port, function(){
  console.log("Server active on port:", port);
})
