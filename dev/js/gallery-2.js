// Gallery-2.js

$(document).ready(function() {

    var cols = 4;


    makeGrid();

    $(window).on('resize', function() {

      makeGrid();

    });

    function makeGrid () {

        if ($(window).width() < 980) {
            cols = 2;
        }

        if ($(window).width() < 480) {
            cols = 1;
        }

        if ($(window).width() >= 980) {
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
                        $(this).css('border-color', 'blue')
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




            });

        });
    }





/*    createGrid();

    $(window).on('resize', function() {
        setTimeout(function() {
            createGrid();
        }, 200);

    });

    function createGrid() {

        $('.grid').imagesLoaded(function() {
            $('.item').css('position', 'absolute');

            var itemObj = {};
            var item2Obj = {};
            var cols = 4;



            $('.item').each(function(i) {


                if(i>0) {

                    var $item = $(this);
                    var $item2 = $item.nextAll('.item:first');

                    $item.css('border-color', 'red');
                    $item2.css('border-color', 'blue');



                    //console.log($item2);

                    var itemObj = {
                        x: $item.position().top,
                        y: $item.position().left,
                        width: $item.outerWidth(),
                        height: $item.outerHeight()
                    };

                    if ($item2.length > 0) {
                        //console.log('It exists !');
                        item2Obj = {
                            x: $item2.position().top,
                            y: $item2.position().left,
                            width: $item2.outerWidth(),
                            height: $item2.outerHeight()
                        };



                        if (itemObj.x <= item2Obj.x + item2Obj.width &&
                            itemObj.x + itemObj.width >= item2Obj.x) {
                            // collision détectée !
                            console.log('collision !');
                            if(!i % cols === 0  && $item.prev('.item').length) {
                                $item.css({
                                    left: $item.prev('.item').position().left + itemObj.width / 2 + 'px'
                                });
                            } else {
                                $item.css({
                                    left: 0
                                });
                            }
                        }

                        if(i % cols === 0 && $item.prev('.item').length) {

                            $(this).css({
                                'left': 0,
                                'top': $(this).prev('.item').position().top
                                + $(this).prev('.item').outerHeight()
                                + 'px'
                            });
                            $(this).nextAll('.item').css({
                                'top': $(this).prev('.item').position().top
                                + $(this).prev('.item').outerHeight()
                                + 'px'
                            });

                        }

                    }


                }




            });

            $('.grid').css({
                'height': $('.item').nextAll('.item:last').position().top + $('.item').nextAll('.item:last').outerHeight() + 'px',
                'width': $('.item').eq(cols -1).position().left + ($('.item').eq(cols - 1).width() / 2) +'px'
            });
        });
    }*/

});
