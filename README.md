# Happy Hour
![](https://i.imgflip.com/o0h6q.jpg)

## Description
Happy Hour is an app that gives you a set of questions asking about your day and suggests the best drink to complement your mood. It also allows you to save your favorite drinks and write comments about them. You also get a great drinking quote to go along with your beverage.

## APIs
Happy Hour will use two APIs, the first one is an API of beverages and the second is a list of drinking quotes.
### http://www.thecocktaildb.com/

This API is broken down into 4 main categories
* alcoholic/non-alcoholic
* category (cocktail, ordinary drink)
* ingredients
* glass type.  

The drinks will be retrieved using an request function  and use the filter function to assigned query selectors. This variable is assigned based on a series of questions they user has answered. These questions and answer choices are as follows:
* question("answers")
* What was your day like?("Brutal, I worked like a dog", "Meh, I've had better", "I crushed this day!", "Awesome, I'm on vacation!")
* How do you want to wake up?("Bright eyed and bushy tailed", "I could be a little tired", "On the floor", "With someone else")
* Are you sweet or bitter("Candy is Dandy", "I drink only through pursed lips")
* Are you drinking socially("Hell yea! PARTY!!", "I prefer my own company")
* What time is it("midday", "evening", "night", "It's 5:00 somewhere") 

Based upon the answers given, the query parameter variables will be assigned in order to whittle down the selection pool. The filters will assign the base alcohol, certain ingredients, and type of glass. There will also be a button that returns a random drink. Once the drink is called, it will pop up in a modal with a picture(if available) the name of the drink, a random quote from my database, and an option to save to favorites if the user is logged in. 

### http://www.goodreads.com/quotes/tag/drinking

As this isn't a standard API, I wrote a quick scraper to mine the data from the website. Once harvested, I placed them into one large json file with each quote in an object with keys "quote" and "author". I then uploaded the data collection to mongo and pull from there using a random return function. 

## Wireframes
- https://wireframe.cc/jsTuoF
- https://wireframe.cc/g6jWwF
- https://wireframe.cc/QNxO44

## User story

- As a user I want to be able to answer a set of questions and be suggested a random drink based on those answers
- As a user I want to be able to select a completely random drink
- As a user I want to be able to pick my base alcohol
- As a user I want to be able to save my favorite drinks and make comments about them
- As a user I want to be able to ban drinks from my profile
- As a user I want to  be able to accept or deny my drink 

## Citation
- How to end a string at a certain character http://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-jquery-or-javascript
- Data scraper with cheerio
- connecting to mongo host http://expressjs.com/en/guide/database-integration.html
