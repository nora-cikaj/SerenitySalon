$(function () {

    "use strict";

    //===== Prealoder

    $(window).on('load', function (event) {
        $('.preloader').delay(500).fadeOut(500);
    });

    //===== Mobile Menu 

    $(".navbar-toggler").on('click', function () {
        $(this).toggleClass('active');
    });

    $(".navbar-nav a").on('click', function () {
        $(".navbar-toggler").removeClass('active');
    });


    //===== close navbar-collapse when a  clicked

    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });


    //===== Sticky

    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 10) {
            $(".navigation-bar").removeClass("sticky");
        } else {
            $(".navigation-bar").addClass("sticky");
        }
    });


    //===== Section Menu Active

    var scrollLink = $('.page-scroll');
    // Active link switching
    $(window).scroll(function () {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function () {

            var sectionOffset = $(this.hash).offset().top - 90;

            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        });
    });


    //===== wow

    new WOW().init();


    //===== AOS

    AOS.init({
        duration: 800,
    });




    //===== Slick Testimonial

    $('.testimonial-active').slick({
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    });


    //===== Back to top

    // Show or hide the sticky footer button
    $(window).on('scroll', function (event) {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200)
        } else {
            $('.back-to-top').fadeOut(200)
        }
    });

    //Animate the scroll to yop
    $('.back-to-top').on('click', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });


    $('#bookAppointment').click(function (e) {
        e.preventDefault();
        $.ajax({
            global: false,
            type: 'POST',
            url: '/add',
            dataType: 'html',
            data: {
                fullname: $("#fullname").val(),
                email: $("#email").val(),
                phone: $("#phone").val(),
                service: $("#service").val(),
                bookingTime: $("#bookingTime").val()
            },

            success: function (result) {
                document.getElementById('success-text').innerText = "You booked an appointment for " + $("#fullname").val() +" on " +$("#bookingTime").val().split('T')[0] +" " +$("#bookingTime").val().split('T')[1];
                modalSuccess.style.display = "block";
                modalError.style.display = "none";
            },
            error: function (request, status, error) {
                modalError.style.display = "block";
                modalSuccess.style.display = "none";
            
                serviceError();
            }
        });
    });

    //   open modal
    // Get the modal
    var modalSuccess = document.getElementById("myModalSuccess");
    var modalError = document.getElementById("myModalError");

    // Get the <span> element that closes the modal
    var closeModalSuccess = document.getElementById("close-btn-success");
    var closeModalError = document.getElementById("close-btn-error");

    // When the user clicks on <span> (x), close the modal
    closeModalSuccess.onclick = function () {
        modalSuccess.style.display = "none";
    }
    closeModalError.onclick = function () {
        modalError.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modalSuccess.style.display = "none";
            modalError.style.display = "none";
        }
    }

    var today = new Date().toISOString().slice(0, 16);
    document.getElementById("bookingTime").setAttribute('min', today);
});
