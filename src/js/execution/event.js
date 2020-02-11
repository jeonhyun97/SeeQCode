// window resizing
$(window).resize(function() {
    updateSize();
    updateScrollViewRect();
    updateScrollMoverRect();
    updateMainViewAxis();
    updateClassRange();
    updateMainViewCircles();
    updateScrollViewCircles();
})
          
// window scrolling
$(function() {
    $("#to_top").hide();
    $(window).scroll(function(){
      if($(this).scrollTop() > 200) {
          $("#to_top").fadeIn(300);
      }
      else {
          $("#to_top").fadeOut(300);
      }
    });
});