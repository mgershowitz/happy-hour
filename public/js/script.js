console.log('connected')

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
        randomQuote();
        console.log(data[i].name);
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
        $('#modal ul').append($('<li>').attr('class', 'quote').text('"'+data.quote.substr(0,200)+'"'))
        $('#modal ul').append($('<li>').attr('class', 'quote').text('- '+data.author))
      },
      error: ()=> {
        console.log('error');
      }
    })
  }

let responses = [];



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
  $('#qOne').val("Brutal, I worked like a dog")
  $('#qTwo').val("Meh, I've had better")
  $('#qThree').val("I crushed this day!")
  $('#qFour').val("Awesome, I'm on vacation!")
  $('#welcome').fadeToggle('fast', (e)=>{
    $('#questions').fadeToggle('fast')
  })
})

$('.firstRound').on('click', (e)=>{
  $('#questions h5').fadeOut(()=>{$(this).text("How do you want to wake up?").fadeIn()});
  $('#qOne').fadeOut(()=>{$(this).val("Bright eyed and bushy tailed").attr('class', "secondRound").fadeIn()})
  $('#qTwo').fadeOut(()=>{$(this).val("I could be a little tired").attr('class', "secondRound").fadeIn()})
  $('#qThree').fadeOut(()=>{$(this).val("On the floor").attr('class', "secondRound").fadeIn()})
  $('#qFour').fadeOut(()=>{$(this).val("With someone else").attr('class', "secondRound").fadeIn()})

  $('.secondRound').on('click', (e)=>{
    $('#questions h5').fade().text("Are you sweet or bitter?");
    $('#qOne').fade().val("Candy is Dandy").attr('class', "thirdRound")
    $('#qTwo').fade().val("I drink only through pursed lips").attr('class', "thirdRound")
    $('#qThree').fadeOut('fast')//.val('').attr('class', "thirdRound")
    $('#qFour').fadeOut('fast')//.val('').attr('class', "thirdRound")

    $('.thirdRound').on('click', (e)=>{
      $('#questions h5').text('Are you drinking socially');
      $('#qOne').val("Hell yea! PARTY!!").attr('class', 'fourthRound')
      $('#qTwo').val("I prefer my own company").attr('class', 'fourthRound')
      $('#qThree').val('').attr('class', 'fourthRound')
      $('#qFour').val('').attr('class', 'fourthRound')

      $('.fourthRound').on('click', (e)=>{
        $('#questions h5').text('What time is it');
        $('#qOne').val("midday").attr('class', 'fifthRound')
        $('#qTwo').val("evening").attr('class', 'fifthRound')
        $('#qThree').fadeIn().val("night").attr('class', 'fifthRound')
        $('#qFour').fadeIn().val("It's 5:00 somewhere").attr('class', 'fifthRound')
      })
    })
  })
})

$('#modal section').on('click', (e)=>{
  $('#modal').fadeToggle('slow');
  $('#welcome').fadeToggle('fast');
  $('#bartender').fadeToggle('fast');
})

})
