console.log('connected')
const randomDrink = ()=>{
    $.ajax({
      url: '/random',
      method: "GET",
      dataType: 'json',
      success: (data)=>{
        console.log(data);
      },
      error: ()=> {
        console.log('error');
      }
    })
  }
// const randomDrink = ()=>{
//   request('http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15112', (error, response, body)=>{
//     if(err) throw err
//       let words = []
//       let arr = JSON.parse(body)
//       for(let i = 0 ; i < 5 ; i++) {
//         words.push(arr[Math.floor(Math.random()*arr.length)].word)
//       }
//       console.log(words.join(" "))
//   })
// }



$(()=>{

$('input').on('click', (e)=>{
  randomDrink()
});


})
