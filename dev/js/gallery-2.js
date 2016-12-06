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




});
