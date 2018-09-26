var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);

  $('.button').on('click', function(){
    window.location.reload();
  });

});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var baseArray = [];
  var randomArray = [];

  for (var i=1; i<=8; i++){
    baseArray.push(i);
    baseArray.push(i);
  }

  while (baseArray.length > 0) {
    var randomIndex = Math.floor(Math.random() * baseArray.length);
    var randomCard = baseArray.splice(randomIndex, 1)[0];
    randomArray.push(randomCard);
  }

  return randomArray;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(randomArray, $game) {

  var colors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'];

  $game.empty();
  $game.data('flippedCards', [])

  for (var k = 0; k < randomArray.length; k++){
    var cardValue = randomArray[k];
    var $cardNew = $('<div class="col-3 card"></div>');
    $cardNew.data('value', cardValue);
    $cardNew.data('backcolor', colors[cardValue-1]);
    $cardNew.data('flipped', false);
    $game.append($cardNew);
  }

  $('.card').click(function() {
    MatchGame.flipCard($(this), $game);
  });

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($cardNew, $game) {

  if ($cardNew.data('flipped')){
    return;
  }

  else {

    $cardNew.css('background-color', $cardNew.data('backcolor'))
    .text($cardNew.data('value'))
    .data('flipped', true);

    var flippedCards = $game.data('flippedCards');
    flippedCards.push($cardNew);

    if (flippedCards.length === 2){
      if (flippedCards[0].data('value') === flippedCards[1].data('value')){
        flippedCards[0].css('background-color', 'rgb(153, 153, 153)')
        .css('color', 'rgb(204, 204, 204)');
        flippedCards[1].css('background-color', 'rgb(153, 153, 153)')
        .css('color', 'rgb(204, 204, 204)');
        $game.data('flippedCards', []);
      }

      else{
        var timeout;
        timeout = window.setTimeout(function() {
            flippedCards[0].data('flipped', false)
            .text('')
            .css('background-color', 'rgb(32, 64, 86)');
            flippedCards[1].data('flipped', false)
            .text('')
            .css('background-color', 'rgb(32, 64, 86)');}
            , 250);
        $game.data('flippedCards', []);
      }
    }
  }
};
