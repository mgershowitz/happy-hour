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

let send = {send:[]}
let pgNum = 15
let url = 'https://www.goodreads.com/quotes/tag/drinking?page='+pgNum;

request(url, function(error, response, html){
    if(!error){
    var $ = cheerio.load(html);
    var quote;
    var json = { quote : "", author: ""};

    for(let i = 0 ; i < $('.quoteText').length ; i++){

    $('.quoteText').eq(i).filter(function(){
        var data = $(this);
        quote = data.text();
        if (quote.includes('/')){
            json.quote  = quote.substr(8, quote.indexOf('―')-14);
            let authorStart = quote.substr(quote.indexOf('―'));
            json.author = authorStart.substr(6, authorStart.indexOf(',')-6);
        } else {
            json.quote  = quote.substr(8, quote.indexOf('―')-14);
            let authorStart = quote.substr(quote.indexOf('―')+6);
            json.author = authorStart.substring(0,authorStart.length-1);
        }
        send.send.push({quote:json.quote, author:json.author})

    })
    }
  }

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

fs.writeFile('output'+pgNum+'.json', JSON.stringify(send, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send(send)

    }) ;

})






app.listen(port, function(){
  console.log("Server active on port:", port);
})
