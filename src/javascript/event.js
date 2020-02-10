// window resizing

$(window).resize(function() {
    updateSize();
    updateMainViewAxis();
    updateScrollViewRect();
    updateScrollMoverRect();
})
          