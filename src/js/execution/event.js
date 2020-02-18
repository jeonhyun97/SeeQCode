// window resizing
$(window).resize(function() {
    updateSize();
    updateScrollRect();
    updateScrollMover();
    updateAxis(true);
    updateMainCircles();
    updateScrollCircles();

    if(window.innerWidth < 900)
      document.getElementById("archiImg").style.width = (window.innerWidth - 100).toString().concat("px");
})
          
// window scrolling
$(function() {
    $("#to_top").hide();
    $(window).scroll(function(){
      if($(this).scrollTop() > 200) $("#to_top").fadeIn(300);
      else $("#to_top").fadeOut(300);
    });
});