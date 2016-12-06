console.log('Folio gallery');

var cols = 4;
var currentImage = [];
var $viewbox = $('<div class="viewbox">'
        +'<div class="viewbox-inner">'

    +'<div class="viewbox-img-container col-6"></div>'
    +'<div class="viewbox-description-container col-6"></div>'
    +'<button class="close-viewer"></button>'
    +'<div class="viewbox-navigation">'
    +'<button class="vb-prev">Prev</button>'
    +'<button class="vb-next">Next</button>'
    +'</div>'
    +'</div>'
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
    var itemIndex = $item.index('.img-block') + 1;
    currentImage = $item.find('img').attr('src');
    viewboxContent.image = currentImage;
    viewboxContent.text = $item.data('text');
    $currentEndOfRow = $item.nextAll('.end-of-row:first');
    $('.end-of-row').removeClass('currentEndOfRow');
    $currentEndOfRow.addClass('currentEndOfRow');




    if ($item.hasClass('end-of-row')) {
        console.log('end');
        tempPastLastItems[1] = tempPastLastItems[0];
    } else {
        tempPastLastItems.push($item.nextAll('.end-of-row:first').index('.end-of-row'));
    }

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


        if (tempPastLastItems[0] === tempPastLastItems[1]) {


            $('.viewbox').show( function() {
                $('.viewbox').remove().insertAfter($lastItemInRow).slideDown(300);
                scrollToViewBox($item);
            });

        } else {



            $('.viewbox').slideUp( 200, function() {
                $('.viewbox').remove().insertAfter($lastItemInRow).slideDown(300);
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
    $('html, body').animate({scrollTop: el.offset().top }, '300', 'swing', function() {

    });
}

$(document).on('click', '.vb-next', function() {
    $('.img-block.selected').nextAll('.img-block:first').trigger('click');
});

$(document).on('click', '.vb-prev', function() {
    $('.img-block.selected').prevAll('.img-block:first').trigger('click');
});