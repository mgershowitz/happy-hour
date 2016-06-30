'use strict'
const express        = require('express')
const app            = express()
const fs             = require('fs')
const path           = require('path')
const logger         = require('morgan')
const bodyParser     = require('body-parser')
const session        = require('express-session')
const methodOverride = require('method-override')
const request        = require('request');
const cheerio        = require('cheerio')
const homeController = require('./controllers/home-controller')
const userController = require('./controllers/user-controller')
const port           = process.env.PORT || 3000


// app.use(session({
//   saveUninitialized: true,
//   resave: true,
//   secret: "tacos!",
//   cookie: {maxAge:60000}
// }));

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, "/bower_components")));
app.use(logger('dev'));
// app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json())
app.use('/', homeController);
//app.use('/user', userController)

// request('https://www.goodreads.com/quotes/tag/drinking', function (error, response, body) {
//   if (!error && response.statusCode == 200) {

//     console.log(body)
//   }
// })

// 'https://www.goodreads.com/search.xml?key=HM4vjFhT38JCJZceY9NhA&quote=drinking

app.get('/scrape', function(req, res){

const url = 'https://www.goodreads.com/quotes/tag/drinking';

request(url, function(error, response, html){
    if(!error){
    var $ = cheerio.load(html);
    var quote;
    var json = { quote : ""};

    $('.quoteText').filter(function(){
        var data = $(this);
        quote = data.text();

        json.quote = quote;

    })
  }

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check console!')

    }) ;
})






app.listen(port, function(){
  console.log("Server active on port:", port);
})
