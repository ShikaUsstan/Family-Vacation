(function () {
    "use strict";

    var cardarray = ["Alabama", "Arizona", "Arkansas", "California", "Colorado", "Florida", "Georgia", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New-Jersey", "New-Mexico", "New-York", "North-Carolina", "North-Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "South-Carolina", "South-Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Washington", "West-Virginia", "Wisconsin", "Wyoming"];
    var deckarray = JSON.parse(JSON.stringify(cardarray));
    var discard = [];
    var cardheight = 0;
    var indexhigh = 1;
    var zoomedIn = "";
    var canDeal = true;

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    //Set the size of the page to optimal for web browser
    function onDeviceReady() {
        cardheight = $(window).innerHeight() * 0.27;

        if ($(window).innerHeight() / $(window).innerWidth() > 2) {
            var cardwidth = ($(window).innerWidth() - ($(window).innerWidth() * .20));
            cardheight = cardwidth / 1.4;
        }
        //set screen widths
        var makemarginal = ($(window).innerHeight() - $(".body-message").height() - cardheight * 3) / 4;
        $(".deck").css('margin-top', makemarginal);
        $(".deck").css('width', cardheight * 1.4);
        $(".deck").css('height', cardheight);
    };

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    deckarray = shuffle(deckarray);
    console.log(deckarray);

    var $decka = $('#decka');
    var $deckb = $('#deckb');
    var $deckc = $('#deckc');

    window.setTimeout(function () {
        $decka.addClass('is-scattered');
        $deckb.addClass('is-scattered');
        $deckc.addClass('is-scattered');
    }, 1);

    var wipetable = function () {
        var $child = $('.deck').children();
        $child.addClass('is-offscreen--l');
        window.setTimeout(function () {
            $child.remove();
        }, 500);
    };

    //Deal 3 new Cards from the Deck onto the Table (Screen)
    var addNewCard = function () {
        if (canDeal) {
            canDeal = false;

            //If the deck has less than 3 cards reshuffle 
            if (deckarray.length < 3) {
                wipetable();
                var extra = JSON.parse(JSON.stringify(deckarray));
                deckarray = JSON.parse(JSON.stringify(cardarray));
                deckarray = shuffle(deckarray);

                //add unused cards to the top
                for (let i = 0; i < extra.length; i++) {
                    if (deckarray.indexOf(extra[i]) > 0) {
                        deckarray.splice(deckarray.indexOf(extra[i]), 1);
                        deckarray.unshift(extra[i]);
                    }
                }
            }
            var $carda = $('<div>', {
                html: '<div id="' + deckarray[0] + '" class="card is-offscreen--r ' + deckarray[0] + '" style="height: ' + cardheight + 'px; z-index: ' + indexhigh + '">'
            }).children(1);
            var $cardb = $('<div>', {
                html: '<div id="' + deckarray[1] + '" class="card is-offscreen--r ' + deckarray[1] + '" style="height: ' + cardheight + 'px; z-index: ' + indexhigh + '">'
            }).children(1);
            var $cardc = $('<div>', {
                html: '<div id="' + deckarray[2] + '" class="card is-offscreen--r ' + deckarray[2] + '" style="height: ' + cardheight + 'px; z-index: ' + indexhigh + '">'
            }).children(1);

            indexhigh += 1;

            $decka.append($carda);
            $deckb.append($cardb);
            $deckc.append($cardc);
            deckarray.splice(0, 3);
            window.setTimeout(function () {
                $carda.removeClass('is-offscreen--r');
            }, 50);
            window.setTimeout(function () {

                window.setTimeout(function () {
                    $cardb.removeClass('is-offscreen--r');
                }, 1);
            }, 150);
            window.setTimeout(function () {
                window.setTimeout(function () {
                    $cardc.removeClass('is-offscreen--r');
                }, 1);
            }, 250);
            window.setTimeout(function () {
                canDeal = true;
            }, 500);
        }
    };

    //If you click anywhere within the body of a page tigger New Cards
    $('body').on('click', function () {
        addNewCard();
    });

    //Initialize zooming into the card
    $('.deck').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        zoomedIn = $(e.target).attr("id");
        $('#zoomcontain').show();
        $('#zoom').addClass(zoomedIn);
    });
    $('#zoomcontain').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#zoomcontain').hide();
        $('#zoom').removeClass(zoomedIn);
    });

    jQuery(function ($) {
        $.preload.images(document);
    });

})();