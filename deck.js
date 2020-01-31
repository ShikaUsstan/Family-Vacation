var cardarray = ["Alabama","Arizona","Arkansas","California","Colorado","Florida","Georgia","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","South Carolina","South Dakota","Tennessee","Texas","Utah","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
var deckarray = JSON.parse(JSON.stringify(cardarray));
var discard = [];
var cardheight = $(window).height() * 0.27;

if($(window).height()/$(window).width()>2){
	var cardwidth = ($(window).width() - ($(window).width()*.20));
	cardheight = cardwidth/1.4;
	var makemarginal = ($(window).height()-$(".body-message").height()-cardheight*3)/4;
	$(".deck").css('margin-top',makemarginal);
}
//set screen widths
$(".deck").css('width',cardheight*1.4);
$(".deck").css('height',cardheight);


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(deckarray);
console.log(deckarray);

var $decka = $('#decka');
var $deckb = $('#deckb');
var $deckc = $('#deckc');

window.setTimeout(function () {
  $decka.addClass('is-scattered');
  $deckb.addClass('is-scattered');
  $deckc.addClass('is-scattered');
}, 1);

var removeTopCard = function () {
  var $child = $deck.children(':last-child');
  $child.addClass('is-offscreen--l');
  window.setTimeout(function () {
    $child.remove();
  }, 500);
}

var wipetable = function(){
	var $child = $('.deck').children();
  $child.addClass('is-offscreen--l');
  window.setTimeout(function () {
    $child.remove();
  }, 500);
}

var addNewCard = function () {
	
  if(deckarray.length<3){
	  wipetable();
	  var extra = JSON.parse(JSON.stringify(deckarray));
	  deckarray = JSON.parse(JSON.stringify(cardarray));
	  shuffle(deckarray);
	  
	  //add unused cards to the top
	  for (i=0; i < extra.length; i++){
		if (deckarray.indexOf(extra[i]) > 0) {
			deckarray.splice(deckarray.indexOf(extra[i]), 1);
			deckarray.unshift(extra[i]);
	    }
	  }
  }
  var $carda = $('<div>', {
    html: '<div class="card is-offscreen--r">'
     + '<img src="./img/' + deckarray[0]+'.png" style="height: '+cardheight+'px;">'
  }).children(1);
  var $cardb = $('<div>', {
    html: '<div class="card is-offscreen--r">'
     + '<img src="./img/' + deckarray[1]+'.png" style="height: '+cardheight+'px;">'
  }).children(1);
  var $cardc = $('<div>', {
    html: '<div class="card is-offscreen--r">'
     + '<img src="./img/' + deckarray[2]+'.png" style="height: '+cardheight+'px;">'
  }).children(1);
  //console.log('card', $card);
  $decka.append($carda);
  $deckb.append($cardb);
  $deckc.append($cardc);
  deckarray.splice(0,3)
  window.setTimeout(function () {
    $carda.removeClass('is-offscreen--r');
	$cardb.removeClass('is-offscreen--r');
	$cardc.removeClass('is-offscreen--r');
  }, 1);
};
 
$('body').on('click', function () {
  console.log('click');
  addNewCard();
});
 
$('.deck').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  console.log('click');
  //removeTopCard();
});