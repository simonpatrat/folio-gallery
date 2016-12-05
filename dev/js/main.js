console.log('Folio gallery');

var cols = 4;
var currentImage = [];
var $viewbox = $('<div class="viewbox">'
    +'<div class="viewbox-img-container col-6"></div>'
    +'<div class="viewbox-description-container col-6"></div>'
    +'<button class="close-viewer"></button>'
    +'</div>');
var viewboxContent = {};
var $items = $('.gallery-container .img-block');
var $lastItemInRow;
var tempPastLastItems = [];


$items.each(function(i) {
    if( ( i + 1 ) % cols === 0) {
        $(this).addClass('end-of-row');
    }
});


$('.gallery-container .img-block').on('click', function() {
    var $item = $(this);
    var itemIndex = $item.index() + 1;
    currentImage = $item.find('img').attr('src');
    viewboxContent.image = currentImage;
    viewboxContent.text = $item.data('text');
    $currentEndOfRow = $item.nextAll('.end-of-row:first');
    $('.end-of-row').removeClass('currentEndOfRow');
    $currentEndOfRow.addClass('currentEndOfRow');

    tempPastLastItems.push($('.currentEndOfRow').index() + 1);

    if(tempPastLastItems.length > 2) {
        tempPastLastItems.shift();
    }

    console.log(tempPastLastItems);

    $('.gallery-container .img-block').removeClass('selected');
    $item.addClass('selected');

    //Set viewBox content
    $viewbox.find('.viewbox-img-container img').remove();
    $viewbox.find('.viewbox-img-container').append('<img src="'+currentImage+'"/>');
    $viewbox.find('.viewbox-description-container').html(
        '<h2>Image '+itemIndex+'</h2>'
        +'<p>'
        + viewboxContent.text
        +'</p>');

    if(!$item.hasClass('end-of-row')) {
        $lastItemInRow = $currentEndOfRow;
    } else {
        $lastItemInRow = $item;
    }

    if($('.viewbox').length === 0) {
        $viewbox.insertAfter($lastItemInRow).slideDown(500, function () {
            scrollToViewBox($item);
        });

    }  else {


        //console.log('itemIndex - cols : ');
        //console.log(itemIndex - cols);
        //console.log('currentEndOfRow index - cols : ');
        //console.log($('.currentEndOfRow').index() - cols);

        if (
            tempPastLastItems[0] === $('.currentEndOfRow').index() + 1
        ) {

            console.log('Ouiiii !!!');

            $('.viewbox').show( function() {
                $('.viewbox').remove().insertAfter($lastItemInRow).slideDown(500);
                scrollToViewBox($item);
            });

        } else {



            $('.viewbox').slideUp( 200, function() {
                $('.viewbox').remove().insertAfter($lastItemInRow).slideDown(500);
                scrollToViewBox($item);
            });
        }


    }

});

$(document).on('click', '.close-viewer', function() {

    $('.viewbox').slideUp(300, function() {
        $('.viewbox').remove();
    });

    $('.img-block').removeClass('selected');

});

function scrollToViewBox (el) {
    $('html, body').animate({scrollTop: el.offset().top }, '500', 'swing', function() {

    });
}