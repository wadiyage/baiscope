console.log("Hi, I'm JS, and I'm here to help you build awesome websites!")

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsiveClass: true,
    responsive: {
        0:{
            items: 1,
            nav: true
        },
        540:{
            items: 2,
            nav: false
        },
        720:{
            items: 3,
            nav: false
        },
        960:{
            items: 4,
            nav: true,
            loop: false
        },
        1140:{
            items: 5,
            nav: true,
            loop: false
        }
    }
})