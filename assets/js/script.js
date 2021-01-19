$('.banner-slider').owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    autoplay:true,
    dots: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplayTimeout: 6000,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
});


$('.docs-slider').owlCarousel({
    loop: true,
    margin: 50,
    nav: false,
    autoplay:true,
    dots: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplayTimeout: 6000,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
})



var jobLists = document.querySelectorAll('.categ ul li');

$('.categ ul li').hover(
    function() {
        $(this).addClass('jobactive');


    },

    function() {
        $(this).removeClass('jobactive');
    }
)

$(window).scroll(function () {
    var sc = $(window).scrollTop()
    if (sc > 300) {
        $("header").addClass("headersmall")
    } else {
        $("header").removeClass("headersmall")
    }
});


$("#construnction").click(function() {
    $('html, body').animate({
        scrollTop: $("#const-sector").offset().top-200
    }, 2000);
});


$("#manufacturing").click(function() {
    $('html, body').animate({
        scrollTop: $("#manu-sector").offset().top-200
    }, 2000);
});

$("#hospitality").click(function() {
    $('html, body').animate({
        scrollTop: $("#hosp-sector").offset().top-200
    }, 2000);
});

$("#administration").click(function() {
    $('html, body').animate({
        scrollTop: $("#admin-sector").offset().top-200
    }, 2000);
});

$("#sales").click(function() {
    $('html, body').animate({
        scrollTop: $("#sales-sector").offset().top-200
    }, 2000);
});

$("#health").click(function() {
    $('html, body').animate({
        scrollTop: $("#health-sector").offset().top-200
    }, 2000);
});

$("#driving").click(function() {
    $('html, body').animate({
        scrollTop: $("#driving-sector").offset().top-200
    }, 2000);
});

$("#agriculture").click(function() {
    $('html, body').animate({
        scrollTop: $("#agri-sector").offset().top-200
    }, 2000);
});

$("#it").click(function() {
    $('html, body').animate({
        scrollTop: $("#it-sector").offset().top-200
    }, 2000);
});

