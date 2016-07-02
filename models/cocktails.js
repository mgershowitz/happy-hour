/*Absolut Drinks Database
9377
Your name
Happy Hour
Your email address
mattgershowitz1@gmail.com
Facebook App Id (optional)
API Key
0f675859d1d941e385aa3d2f5bacbe8c
API Secret
dd72d5147f784c418e8ba06adc6055a8*/





const request = require('request')

module.exports = {
  randomDrink: ()=>{
  request('http://addb.absolutdrinks.com/drinks/?apiKey=0f675859d1d941e385aa3d2f5bacbe8c', (err, response, body)=>{
    if(err) throw err
      let arr = JSON.parse(body)
      console.log(arr)

  })
}
}





