// Gallery-2.js

$(document).ready(function() {

    var myGrid = new SuperGrid();

    $('.btn-modify').on('click', function() {

        var $newItem = '<div class="item"><img src="https://source.unsplash.com/random/'
            +Math.floor((Math.random() * 800) + 400)
            +'x'+Math.floor((Math.random() * 800) + 400)
            +'?sig='+Math.floor((Math.random() * 100) + 1)+'"/></div>';

        if($(this).hasClass('add-element')) {

            $('.grid').prepend($newItem);

        } else if ($(this).hasClass('remove-element')) {

            $('.grid').find('.item:last').remove();
        }
    });

    $('.btn-filter-group .btn-filter').on('click', function() {

        var toShow = $(this).data('filter');

        $('.grid').find(toShow).removeClass('hidden-item').addClass('selected-item item');

        $('.grid').find('.item').not(toShow).addClass('hidden-item').removeClass('selected-item item');

        var $gridSave = $('.grid').clone();



/*        $('.hidden-item').on('transitionend', function() {

            $(this).fadeOut(500, function() {

                myGrid.makeGrid(4);
            });

        });*/

    });

});





function SuperGrid() {

    //this.$grid = $('.grid');
    //this.$widthSetterEl = $('item');
    var self = this;

    this.cols = 4;

    var cols = this.cols;



    this.makeGrid = function(cols) {

        var heights = [];

        var heightMax;

        if (window.innerWidth <= 980) {
            cols = 2;
        }

        if (window.innerWidth <= 480) {
            cols = 1;
        }

        if (window.innerWidth > 980) {
            cols = 4;
        }


        $('.grid').imagesLoaded(function() {


            $('.item').css('position', 'absolute');


            $('.item').each(function(i) {

                var $this = $(this);

                //$this.attr('data-left', $this.position().left);
                //$this.attr('data-width', $this.outerWidth());
                //$this.attr('data-somme', $this.position().left + $this.outerWidth());

                if ($this.index('.item') === 0) {
                    $this.addClass('first');
                    $this.css('top', 0);
                    $this.css('left', 0);
                }

                if ($this.css('display') == 'none') {
/*                    $this.width(0);
                    $this.height(0);
                    $this.innerWidth(0);
                    $this.innerHeight(0);
                    $this.outerWidth(0);
                    $this.outerHeight(0);*/
                }

                if (i >= 1 ) {

                    var $prev = $this.prevAll('.item:first');

                    var x = $this.position().left;
                    var y = $this.position().top;
                    var w = $this.outerWidth();
                    var h = $this.outerHeight();

                    var prevX = $prev.position().left;
                    var prevY = $prev.position().top;
                    var prevW = $prev.outerWidth();
                    var prevH = $prev.outerHeight();

                    var firstOfLastRowBottom = $('.item').eq($this.index() - cols).position().top + $('.item').eq($this.index() - cols).outerHeight();

                    if (i < cols) {
                        $this.css('top', 0);
                        $this.css('left', prevX + prevW + 'px');
                    }

                    else if (i % cols === 0 ) {
                        $this.css('top', firstOfLastRowBottom + 'px');
                        $this.css('left', 0);

                    } else {
                        $this.css('top', firstOfLastRowBottom + 'px');
                        $this.css('left', prevX + prevW + 'px');
                        /*
                         if (prevX + (prevW / 2)  + ($this.width() / 2) >= $('.grid').width()) {
                         $this.css('top', firstOfLastRowBottom + 'px');
                         $this.css('left', 0);
                         }*/
                    }


                }

                if( heights.length >= $('.item').length ) {
                    heights = [];
                } else {
                    heights.push($this.outerHeight() + $this.position().top);
                }




            });

            //$('.grid').css('height');

            heightMax = Math.max.apply(null, heights);

            /*
             console.log(heights);
             console.log(heightMax);
             */

            $('.grid').css('height', heightMax + 'px');
        });
    };

    this.init = function() {

        this.makeGrid(cols);

        $(window).on('resize', function() {
            self.makeGrid(cols);
        });


    };

    this.init();

    var insertListener = function(event){
        if (event.animationName == "nodeInserted") {
            // This is the debug for knowing our listener worked!
            // event.target is the new node!
            console.warn("Another node has been inserted! ", event, event.target);

            self.makeGrid(cols);

        }

        else if (event.animationName == "itemRemoved") {
            console.log('animation !');
            // This is the debug for knowing our listener worked!
            // event.target is the new node!
            //console.warn("Another item has been removed! ", event, event.target);

            //self.makeGrid(cols);
        }
    };

   document.addEventListener("animationend", insertListener, false);


}
