
let mover;
let moverWidth, moverHeight;
let moverRatio;


// temporal variables for the zomming / dragging sessionss
var currentMoverMargin;
var currentDraggingOffset;
var currentZoomingCenter;

function initScrollMoverRect() {
    currentMoverMargin = margin.left

    moverRatio = viewWidth / viewHeight;  // initial mover ratio, can be changed
    moverHeight = scrollHeight;
    moverWidth = 0.07 * scrollWidth * moverRatio;

    mover = scrollView.append("rect")
                      .attr("width", moverWidth)
                      .attr("height", moverHeight)
                      .attr("x", currentMoverMargin)
                      .attr("fill", "#993323")
                      .attr("opacity", 0.3);
    
    addMoverDragAction();
    addMoverZoomAction();
}


function addMoverDragAction() {
    mover.call(d3.drag()
        .on("drag", function() {
            let x = d3.event.x - currentDraggingOffset;
            if(x < margin.left)
                d3.select(this).attr("x", margin.left);
            else if(x + moverWidth > scrollWidth - margin.right)
                d3.select(this).attr("x", scrollWidth - margin.right - moverWidth);
            else 
                d3.select(this).attr("x", x);
            currentMoverMargin = d3.select(this).node().getBBox().x;
        })
        .on("start", function() {
            currentDraggingOffset = d3.event.x - d3.select(this).node().getBBox().x;
            d3.select(this).attr("opacity", 0.4);
        })
        .on("end", function() {
            d3.select(this).attr("opacity", 0.3);
        }))
}

function addMoverZoomAction() {
    zoom = d3.zoom();
    mover.call(zoom
        .on("zoom", function() {
            let tempWidth = d3.event.transform.k * moverWidth;
            let tempMoverMargin = currentMoverMargin - (d3.event.transform.k - 1) * moverWidth / 2;
            console.log(d3.event.transform);
            if(tempMoverMargin < margin.left) {
                d3.select(this).attr("width", (currentZoomingCenter - margin.left) * 2)
                               .attr("x", margin.left);
                if(d3.event.transform.k != 1) {
                    moverWidth = d3.select(this).node().getBBox().width;
                    currentMoverMargin = d3.select(this).node().getBBox().x;
                    d3.select(this).call(zoom.transform, d3.zoomIdentity.scale(1));
                }
            }
            else if(tempMoverMargin + tempWidth > scrollWidth - margin.right) {
                let widthLimit = (scrollWidth - margin.right - currentZoomingCenter) * 2;
                let marginLimit = scrollWidth - margin.right - widthLimit;
                d3.select(this).attr("width", widthLimit)
                               .attr("x", marginLimit);
                if(d3.event.transform.k != 1) {
                    moverWidth = d3.select(this).node().getBBox().width;
                    currentMoverMargin = d3.select(this).node().getBBox().x;
                    d3.select(this).call(zoom.transform, d3.zoomIdentity.scale(1));
                }
            }
            else {
                d3.select(this).attr("width", tempWidth)
                               .attr("x", tempMoverMargin);
            }
        })
       .on("start", function() {
           d3.select(this).attr("opacity", 0.4);
           currentZoomingCenter = currentMoverMargin + moverWidth / 2;
        })
        .on("end", function() {
            moverWidth = d3.select(this).node().getBBox().width;
            currentMoverMargin = d3.select(this).node().getBBox().x;
            d3.select(this).attr("opacity", 0.3);
            if(d3.event.transform.k != 1)
                d3.select(this).call(zoom.transform, d3.zoomIdentity.scale(1));
        }))

}

function updateScrollMoverRect() {
    moverHeight = scrollHeight;
    moverWidth = 0.07 * scrollWidth * moverRatio;
    mover.attr("width", moverWidth) 
         .attr("height", moverHeight);
}
