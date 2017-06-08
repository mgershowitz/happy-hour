console.log('connected');

let drink = {
  whiskey: 0,
  rum: 0,
  gin: 0,
  vodka: 0,
};

const randomQuote = () => {
  $.ajax({
    url: '/api/quote',
    method: 'GET',
  })
  .then((data) => {
    const quote = (data.quote.length > 200) ? `"${data.quote.substr(0, 200)}..."` : `"${data.quote}"`;
    $('#desc').append($('<li>').attr('class', 'quote').text(quote));
    $('#desc').append($('<li>').attr('class', 'quote').text(`- ${data.author}`));
  })
  .catch(err => console.log(err));
};

const getDrink = (drink) => {
  let count = drink.whiskey;
  let liquor = 'whiskey';
  for (let key in drink) {
    if (drink.key > count) {
      liquor = key;
    }
  }
  console.log(liquor);
  $.ajax({
    url: '/api/drinks',
    method: 'GET',
  })
  .then((data) => {
    const i = Math.floor(Math.random() * data.length);
    $('#drink img').attr('src', `http://assets.absolutdrinks.com/drinks/solid-background-white/soft-shadow/floor-reflection/${data[i].id}.png`);
    $('#modal h4').text(data[i].name);
    $('#modal ul').append($('<li>').text(data[i].descriptionPlain));
    $('#modal ul').append($('<ul>').attr('id', 'ingredients'));
    for (let j = 0; j < data[i].ingredients.length; j++) {
      const $li = $('<li>').text(data[i].ingredients[j].type);
      $('#ingredients').append($li);
    }
    randomQuote();
  })
  .catch(err => console.log(err));
};

const randomDrink = () => {
  $.ajax({
    url: '/api/drinks',
    method: 'GET',
  })
  .then((data) => {
    const i = Math.floor(Math.random() * data.length);
    $('#drink img').attr('src', `http://assets.absolutdrinks.com/drinks/solid-background-white/soft-shadow/floor-reflection/${data[i].id}.png`);
    $('#modal h4').text(data[i].name);
    $('#modal ul').append($('<li>').text(data[i].descriptionPlain));
    $('#modal ul').append($('<ul>').attr('id', 'ingredients'));
    for (let j = 0; j < data[i].ingredients.length; j++) {
      const $li = $('<li>').text(data[i].ingredients[j].type);
      $('#ingredients').append($li);
    };
    randomQuote();
  })
  .catch(err => console.log(err));
};

$(() => {

  $('#bartender').on('click', () => {
    $('#bartender').fadeToggle('fast', () => {
      $('#welcome').fadeToggle('fast');
    });
  });

  $('#random').on('click', () => {
    $('#drink img').attr('src', '/img/shaker.gif');
    $('#modal ul').empty();
    $('#modal h4').text('Coming right up');
    randomDrink();
    $('#modal').fadeToggle('slow');
  });


  $('#start').on('click', () => {
    // console.log(drink);
    $('#questions h5').text('What was your day like?');
    $('#qOne').val('Brutal, I worked like a dog').on('click', () => { drink.whiskey += 1; });
    $('#qTwo').val('Meh, I\'ve had better').on('click', () => { drink.rum += 1; });
    $('#qThree').val('I crushed this day!').on('click', () => { drink.gin += 1; });
    $('#qFour').val('Awesome, I\'m on vacation!').on('click', () => { drink.vodka += 1; });
    $('#welcome').fadeToggle('fast', () => {
      $('#questions').fadeToggle('fast');
    });

    $('.firstRound').on('click', (e)=>{
      $('#questions h5').text('How do you want to wake up?');
      $('#qOne').val('Bright eyed and bushy tailed').attr('class', 'secondRound button')
      $('#qTwo').val('I could be a little tired').attr('class', 'secondRound button')
      $('#qThree').val('On the floor').attr('class', 'secondRound button')
      $('#qFour').val('With someone else').attr('class', 'secondRound button')

      $('.secondRound').on('click', (e)=>{
        $('#questions h5').text('Are you sweet or bitter?');
        $('#qOne').val('Candy is Dandy').attr('class', 'thirdRound button')
        $('#qTwo').val('I drink only through pursed lips').attr('class', 'thirdRound button')
        $('#qThree').fadeOut('fast')//.val('').attr('
        $('#qFour').fadeOut('fast')

        $('.thirdRound').on('click', () => {
          $('#questions h5').text('Are you drinking socially');
          $('#qOne').val('Hell yea! PARTY!!').attr('class', 'fourthRound button');
          $('#qTwo').val('I prefer my own company').attr('class', 'fourthRound button');
          $('#qThree').val('').attr('class', 'fourthRound button');
          $('#qFour').val('').attr('class', 'fourthRound button');

          $('.fourthRound').on('click', () => {
            $('#questions h5').text('What time is it');
            $('#qOne').val('midday').attr('class', 'fifthRound button');
            $('#qTwo').val('evening').attr('class', 'fifthRound button');
            $('#qThree').fadeIn().val('night').attr('class', 'fifthRound button');
            $('#qFour').fadeIn().val('It\'s 5:00 somewhere').attr('class', 'fifthRound button');

            $('.fifthRound').on('click', () => {
              $('#questions h5').text('guess what');
              $('#drink img').attr('src', '/img/shaker.gif');
              $('#modal h4').text('Coming right up');
              $('#modal ul').empty();
              $('#modal').fadeToggle('fast');
              $('#questions').fadeToggle('fast');
              $('#welcome').fadeToggle('fast');
              $('#questions h5').text('What was your day like?');
              $('#qOne').val('Brutal, I worked like a dog').attr('class', 'firstRound button');
              $('#qTwo').val('Meh, I\'ve had better').attr('class', 'firstRound button');
              $('#qThree').val('I crushed this day!').attr('class', 'firstRound button');
              $('#qFour').val('Awesome, I\'m on vacation!').attr('class', 'firstRound button');
              getDrink(drink);
            });
          });
        });
      });
    });
  });

  $('#quote').on('click', () => {
    $('#desc').empty();
    randomQuote();
    $('#modal').fadeToggle('slow');
    $('#welcome').fadeToggle();
    $('#bartender').fadeToggle();
  });

  $('#modal section').on('click', () => {
    $('.button').off('click');
    $('#modal').fadeToggle('slow');
    $('#welcome').fadeToggle('fast');
    $('#bartender').fadeToggle('fast');
  });
});
