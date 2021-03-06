// Fix for browsers that doesn't support CSS3 

(function($, window, document, undefined) {


    var s = document.body || document.documentElement,
        s = s.style;

    if (s.webkitFlexWrap == '' || s.msFlexWrap == '' || s.flexWrap == '' || Modernizr.csstransforms == 'true' || Modernizr.svg == 'true') return true;
    $('head').append('<link rel="stylesheet" href="web/css/css3fixes.css" type="text/css" />');

})(jQuery, window, document);

//Can touch 
var canTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));

//SVG
var SVGsupport = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;

if (!SVGsupport) {
    document.getElementsByTagName('html')[0].className += ' no-svg';
}

//Respimage
function loadJS(u) {
    var r = document.getElementsByTagName("script")[0],
        s = document.createElement("script");
    s.src = u;
    r.parentNode.insertBefore(s, r);
}

if (!window.HTMLPictureElement) {
    document.createElement('picture');
    loadJS("web/js/respimage.min.js");
}


//Document ready
$(document).ready(function() {
    var body = $('body');

    //Can touch
    if (canTouch) {
        body.removeClass('no-touch');
    } else {
        body.addClass('no-touch');
    }

    //SVG
    if (!SVGsupport) {
        $('img[src$="svg"]').each(function() {
            var $this = $(this);
            if ($this.data('image') != 'undefined') {
                $this.attr('src', $this.data('image'));
            }
        });
    }

    //Active main navigation
    $('.menu').on('click', function(e) {
        e.preventDefault();
        body.toggleClass('main-nav-active');
    });

    $(window).scroll(function() {
        if ($(window).scrollTop() >= 80) {
            body.addClass('fixed-header');
        } else {
            body.removeClass('fixed-header');
        }
    });

    //Init homepage big slider
    if ($('#home-slider')) {
        $('#home-slider').slick({
            arrows: false,
            dots: true
        });
    }

    //Init team slider 
    if ($('#team-slider')) {
        $('#team-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 540,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    //Init courses slider
    if ($('#courses-slider')) {
        $('#courses-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [{
                    breakpoint: 990,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 542,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    //Init gallery slider

    $('.js-ajax-slider').on('click', function(e){
        e.preventDefault();
        $.ajax({
            type: "GET",
            url:  "includes/gallery-slider.html", 
            success: function(result){
                $('#gallery-slider-content').html(result);
                $(document).find('#gallery-slider').slick({
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    responsive: [{
                            breakpoint: 990,
                            settings: {
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });
            }
        });
    });

    //Animation scroll to section

    // $(".js-animation-scroll").click(function() {
    //     var section = $(this).data('section');
    //     $('html, body').animate({
    //         scrollTo: $('#about-us').offset().top
    //     }, 2000);
    // });
});