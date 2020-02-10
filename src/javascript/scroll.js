
let mover;
let moverWidth, moverHeight;
let moverRatio;

var currentMoverMargin;
var currentDraggingOffset;

function initScrollMoverRect() {
    currentMoverMargin = margin.left

    moverRatio = viewWidth / viewHeight;  // initial mover ratio, can be changed
    moverHeight = scrollHeight;
    moverWidth = 0.07 * scrollWidth * moverRatio;

    mover = scrollView.append("rect")
                      .attr("width", moverWidth)
                      .attr("height", moverHeight)
                      .attr("x", currentMoverMargin)
                      .attr("fill", "#535399")
                      .attr("opacity", 0.3)
                      .call(d3.drag()
                                    .on("drag", function() {
                                        let x = d3.event.x - currentDraggingOffset;
                                        if(x < margin.left)
                                            d3.select(this).attr("x", margin.left);
                                        else if(x + moverWidth > scrollWidth - margin.right)
                                            d3.select(this).attr("x", scrollWidth - margin.right - moverWidth);
                                        else 
                                            d3.select(this).attr("x", x);
                                    })
                                    .on("start", function() {
                                        currentDraggingOffset = d3.event.x - d3.select(this).node().getBBox().x;
                                        d3.select(this).attr("opacity", 0.5);
                                    })
                                    .on("end", function() {
                                        d3.select(this).attr("opacity", 0.3);
                                    }))

}

function updateScrollMoverRect() {
    moverHeight = scrollHeight;
    moverWidth = 0.07 * scrollWidth * moverRatio;
    mover.attr("width", moverWidth) 
         .attr("height", moverHeight);
}
