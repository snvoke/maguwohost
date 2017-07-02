var toTop = document.querySelector('.to-top');
var iconMenu = document.querySelector('.hamburger');
var menu = document.querySelector('.nav');

iconMenu.addEventListener('click', function(event) {
  event.preventDefault();
  iconMenu.classList.toggle('hamburger--active');
  menu.classList.toggle('nav--show');
})

function scrollToTop(scrollDuration) {
  const   scrollHeight = window.scrollY,
          scrollStep = Math.PI / ( scrollDuration / 15 ),
          cosParameter = scrollHeight / 2;

  var     scrollCount = 0,
          scrollMargin,
          scrollInterval = setInterval( function() {
          if ( window.scrollY != 0 ) {
              scrollCount = scrollCount + 1;
              scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
              window.scrollTo( 0, ( scrollHeight - scrollMargin ) );
          }
          else clearInterval(scrollInterval);
        }, 15 );
}

var scrollObject = {};
window.onscroll = getScrollPosition;

function getScrollPosition(){
  scrollObject = {
    x: window.pageXOffset,
    y: window.pageYOffset
  }
  // If you want to check distance
  if(scrollObject.y > 600) {
    // add class
    show();
  } else {
    // remove class
    hide()
  }
}

function hide() {
  toTop.classList.add("to-top--hidden");
}

function show() {
  toTop.classList.remove("to-top--hidden");
}

toTop.addEventListener('click', function(event) {
  event.preventDefault();
  scrollToTop(1500);
  // document.body.scrollTop = 0; // For Chrome, Safari and Opera
  // document.documentElement.scrollTop = 0; // For IE and Firefox
});
