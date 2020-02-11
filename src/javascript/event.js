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
          