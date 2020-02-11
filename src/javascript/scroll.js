
let mover;
let moverWidth, moverHeight;
let moverRatio;

let moverCenterRatio;


// temporal variables for the zomming / dragging sessionss
var currentMoverMargin;
var currentDraggingOffset;
var currentZoomingCenter;

function initScrollMoverRect() {
    currentMoverMargin = margin.left;

    moverRatio = 0.07 * viewWidth / viewHeight;  // initial mover ratio, can be changed
    moverHeight = scrollHeight;
    moverWidth = scrollRectWidth * moverRatio;

    moverCenterRatio = (moverWidth * 0.5) / scrollRectWidth;

    mover = scrollView.append("rect")
                      .attr("id", "scrollRectMover")
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
            else if(x + moverWidth > scrollRectWidth + margin.left)
                d3.select(this).attr("x", scrollRectWidth + margin.left - moverWidth);
            else 
                d3.select(this).attr("x", x);
            currentMoverMargin = d3.select(this).node().getBBox().x;
            
            updateScrollMoverRange();
            updateMainViewAxis();
        })
        .on("start", function() {
            currentDraggingOffset = d3.event.x - d3.select(this).node().getBBox().x;
            d3.select(this).attr("opacity", 0.4);
        })
        .on("end", function() {
            d3.select(this).attr("opacity", 0.3);
            moverCenterRatio = (moverWidth * 0.5 + currentMoverMargin - margin.left) / scrollRectWidth;
        }))
}

function addMoverZoomAction() {
    zoom = d3.zoom();
    mover.call(zoom
        .on("zoom", function() {
            let tempWidth = d3.event.transform.k * moverWidth;
            let tempMoverMargin = currentMoverMargin - (d3.event.transform.k - 1) * moverWidth / 2;
            if(tempMoverMargin < margin.left) {
                d3.select(this).attr("width", (currentZoomingCenter - margin.left) * 2)
                               .attr("x", margin.left);
                if(d3.event.transform.k != 1) {
                    moverWidth = d3.select(this).node().getBBox().width;
                    currentMoverMargin = d3.select(this).node().getBBox().x;
                    d3.select(this).call(zoom.transform, d3.zoomIdentity.scale(1));
                }
            }
            else if(tempMoverMargin + tempWidth > scrollRectWidth + margin.left) {
                let widthLimit = (scrollRectWidth + margin.left - currentZoomingCenter) * 2;
                let marginLimit = scrollRectWidth + margin.left - widthLimit;
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
            updateScrollMoverRange();
            updateMainViewAxis();

        })
       .on("start", function() {
           d3.select(this).attr("opacity", 0.4);
           currentZoomingCenter = currentMoverMargin + moverWidth / 2;
        })
        .on("end", function() {
            moverWidth = d3.select(this).node().getBBox().width;
            currentMoverMargin = d3.select(this).node().getBBox().x;
            moverRatio = moverWidth / scrollRectWidth;
            d3.select(this).attr("opacity", 0.3);
            if(d3.event.transform.k != 1)
                d3.select(this).call(zoom.transform, d3.zoomIdentity.scale(1));
        }))
}

function updateScrollMoverRect() {
    moverHeight = scrollHeight;
    moverWidth = scrollRectWidth * moverRatio;


    currentMoverMargin = moverCenterRatio * scrollRectWidth - moverWidth / 2 + margin.left;
    mover.attr("width", moverWidth) 
         .attr("height", moverHeight)
         .attr("x", currentMoverMargin);
}
