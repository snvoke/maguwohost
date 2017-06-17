// var btn = document.querySelector('.to-top');
//
// btn.addEventListener('click', function(event) {
//   event.preventDefault();
//   document.body.scrollTop = 0; // For Chrome, Safari and Opera
//   document.documentElement.scrollTop = 0; // For IE and Firefox
// });

$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 600) {
        $('.to-top').fadeIn();
    } else {
        $('.to-top').fadeOut();
    }
});

$(document).ready(function() {
    $(".to-top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});
