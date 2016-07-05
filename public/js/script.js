console.log('connected')

let drink = "rum"
let responses = {drink}

const getDrink = ()=>{
  $.ajax({
    url: '/drinks',
    method: "GET",
    dataType: 'json',
    // data: {
    //   i: ingredients.type.drink
    // },
    success: (data)=>{
      let i = Math.floor(Math.random()*data.length)
      $('#drink img').attr('src','http://assets.absolutdrinks.com/drinks/solid-background-white/soft-shadow/floor-reflection/'+data[i].id+'.png')
      $('#modal h4').text(data[i].name)
      $('#modal ul').append($('<li>').text(data[i].descriptionPlain))
      $('#modal ul').append($('<ul>').attr('id','ingredients'));
      for(let j = 0 ; j < data[i].ingredients.length ; j++) {
        let $li = $('<li>').text(data[i].ingredients[j].type);
        $('#ingredients').append($li);
       }
      randomQuote();
      console.log(data)
    },
    error: ()=> {
      console.log('error');
    }
  })
}

const randomDrink = ()=>{
  $.ajax({
    url: '/drinks',
    method: "GET",
    dataType: 'json',
    success: (data)=>{
      let i = Math.floor(Math.random()*data.length)
      $('#drink img').attr('src','http://assets.absolutdrinks.com/drinks/solid-background-white/soft-shadow/floor-reflection/'+data[i].id+'.png')
      $('#modal h4').text(data[i].name)
      $('#modal ul').append($('<li>').text(data[i].descriptionPlain))
      $('#modal ul').append($('<ul>').attr('id','ingredients'));
      for(let j = 0 ; j < data[i].ingredients.length ; j++) {
        let $li = $('<li>').text(data[i].ingredients[j].type);
        $('#ingredients').append($li);
       }
      randomQuote();
      console.log(data)
    },
    error: ()=> {
      console.log('error');
    }
  })
}

const randomQuote = ()=>{
  $.ajax({
    url: '/quote',
    method: "GET",
    dataType: 'json',
    success: (data)=>{
      if(data.quote.length < 200) {
        $('#desc').append($('<li>').attr('class', 'quote').text('"'+data.quote.substr(0,200)+'..."'))
      } else {
        $('#desc').append($('<li>').attr('class', 'quote').text('"'+data.quote+'"'))
      }
      $('#desc').append($('<li>').attr('class', 'quote').text('- '+data.author))
    },
    error: ()=> {
      console.log('error');
    }
  })
}




$(()=>{

$('#random').on('click', (e)=>{
  $('#drink img').attr('src','/img/shaker.gif')
  $('#modal ul').empty()
  $('#modal h4').text("Coming right up")
  randomDrink();
  $('#modal').fadeToggle('slow');
});

$('#bartender').on('click', (e)=>{
  $('#bartender').fadeToggle('fast', (e)=>{
    $('#welcome').fadeToggle('fast')
  })
})

$('#start').on('click', (e)=>{
  $('#questions h5').text('What was your day like?')
  $('#qOne').val("Brutal, I worked like a dog").on('click', (e) => {drink = 'whiskey' })
  $('#qTwo').val("Meh, I've had better").on('click', (e) => {drink = 'gin' })
  $('#qThree').val("I crushed this day!").on('click', (e) => {drink = 'vodka' })
  $('#qFour').val("Awesome, I'm on vacation!").on('click', (e) => {drink = 'rum' })
  $('#welcome').fadeToggle('fast', (e)=>{
    $('#questions').fadeToggle('fast')
  })

  $('.firstRound').on('click', (e)=>{
    $('#questions h5').text("How do you want to wake up?");
    $('#qOne').val("Bright eyed and bushy tailed").attr('class', "secondRound button")
    $('#qTwo').val("I could be a little tired").attr('class', "secondRound button")
    $('#qThree').val("On the floor").attr('class', "secondRound button")
    $('#qFour').val("With someone else").attr('class', "secondRound button")

    $('.secondRound').on('click', (e)=>{
      $('#questions h5').text("Are you sweet or bitter?");
      $('#qOne').val("Candy is Dandy").attr('class', "thirdRound button")
      $('#qTwo').val("I drink only through pursed lips").attr('class', "thirdRound button")
      $('#qThree').fadeOut('fast')//.val('').attr('
      $('#qFour').fadeOut('fast')

      $('.thirdRound').on('click', (e)=>{
        $('#questions h5').text('Are you drinking socially');
        $('#qOne').val("Hell yea! PARTY!!").attr('class', 'fourthRound button')
        $('#qTwo').val("I prefer my own company").attr('class', 'fourthRound button')
        $('#qThree').val('').attr('class', 'fourthRound button')
        $('#qFour').val('').attr('class', 'fourthRound button')

        $('.fourthRound').on('click', (e)=>{
          $('#questions h5').text('What time is it');
          $('#qOne').val("midday").attr('class', 'fifthRound button')
          $('#qTwo').val("evening").attr('class', 'fifthRound button')
          $('#qThree').fadeIn().val("night").attr('class', 'fifthRound button')
          $('#qFour').fadeIn().val("It's 5:00 somewhere").attr('class', 'fifthRound button')

          $('.fifthRound').on('click', (e)=>{
            $('#questions h5').text('guess what');
            $('#drink img').attr('src','/img/shaker.gif')
            $('#modal h4').text("Coming right up")
            $('#modal ul').empty();
            $('#modal').fadeToggle('fast');
            $('#questions').fadeToggle('fast');
            $('#welcome').fadeToggle('fast');
            $('#questions h5').text('What was your day like?')
            $('#qOne').val("Brutal, I worked like a dog").attr('class', 'firstRound button')
            $('#qTwo').val("Meh, I've had better").attr('class', 'firstRound button')
            $('#qThree').val("I crushed this day!").attr('class', 'firstRound button')
            $('#qFour').val("Awesome, I'm on vacation!").attr('class', 'firstRound button')
            getDrink();
          })
        })
      })
    })
  })
})
$('#quote').on('click', (e) => {
  $('#desc').empty()
  randomQuote()
  $('#modal').fadeToggle('slow')
  $('#welcome').fadeToggle();
  $('#bartender').fadeToggle();
})

$('#modal section').on('click', (e)=>{
  $('.button').off('click')
  $('#modal').fadeToggle('slow');
  $('#welcome').fadeToggle('fast');
  $('#bartender').fadeToggle('fast');
})

})
