// local variables 

let mover;
let moverCenterRatio;
let moverRatio;
let moverWidth, moverHeight;
let moverMargin;
let draggingOffset;
let moverCenter;

/* =================== PUBLIC FUNCTIONS ================== */
/* ======================================================= */

function initScrollMover() {
    moverMargin = margin.left;
    moverRatio  = 0.07 * viewWidth / mainViewHeight;  // initial mover ratio, can be changed
    moverHeight = scrollViewHeight;
    moverWidth  = viewWidth * moverRatio;

    moverCenterRatio = (moverWidth * 0.5) / viewWidth;

    mover = scrollView.append("rect")
                      .attr("id", "scrollRectMover")
                      .attr("width", moverWidth)
                      .attr("height", moverHeight)
                      .attr("x", moverMargin)
                      .attr("fill", "#993323")
                      .attr("opacity", 0.3);
    
    registerMoverDragAction();
    registerMoverZoomAction();
}

function updateScrollMover() {
    moverHeight = scrollViewHeight;
    moverWidth  = viewWidth * moverRatio;

    moverMargin = moverCenterRatio * viewWidth - moverWidth / 2 + margin.left;
    mover.attr("width", moverWidth) 
         .attr("height", moverHeight)
         .attr("x", moverMargin);
}

/* ======================================================= */
/* =============== END OF PUBLIC FUNCTIONS =============== */


/* =================== HELPER FUNCTIONS ================== */
/* ======================================================= */

function registerMoverDragAction() {
    mover.call(d3.drag()
        .on("drag", function() {
            let x = d3.event.x - draggingOffset;
            if (x < margin.left)
                d3.select(this).attr("x", margin.left);
            else if (x + moverWidth > viewWidth + margin.left)
                d3.select(this).attr("x", viewWidth + margin.left - moverWidth);
            else 
                d3.select(this).attr("x", x);
            moverMargin = d3.select(this).node().getBBox().x;
            updateScrollMoverRange();
            updateAxis(false);
            updateMainCircles();
        })
        .on("start", function() {
            draggingOffset = d3.event.x - d3.select(this).node().getBBox().x;
            d3.select(this).attr("opacity", 0.4);
        })
        .on("end", function() {
            d3.select(this).attr("opacity", 0.3);
            moverCenterRatio = (moverWidth * 0.5 + moverMargin - margin.left) / viewWidth;
        }))
}

function registerMoverZoomAction() {
    zoom = d3.zoom();
    mover.call(zoom
        .on("zoom", function() {
            let tempWidth = d3.event.transform.k * moverWidth;
            let tempMoverMargin = moverMargin - (d3.event.transform.k - 1) * moverWidth / 2;

            if(tempMoverMargin < margin.left) {
                d3.select(this).attr("width", (moverCenter - margin.left) * 2)
                               .attr("x", margin.left);
                if(d3.event.transform.k != 1) {
                    moverWidth = d3.select(this).node().getBBox().width;
                    moverMargin = d3.select(this).node().getBBox().x;
                    d3.select(this).call(zoom.transform, d3.zoomIdentity.scale(1));
                }
            }
            else if(tempMoverMargin + tempWidth > viewWidth + margin.left) {
                let widthLimit = (viewWidth + margin.left - moverCenter) * 2;
                let marginLimit = viewWidth + margin.left - widthLimit;
                d3.select(this).attr("width", widthLimit)
                               .attr("x", marginLimit);
                if(d3.event.transform.k != 1) {
                    moverWidth = d3.select(this).node().getBBox().width;
                    moverMargin = d3.select(this).node().getBBox().x;
                    d3.select(this).call(zoom.transform, d3.zoomIdentity.scale(1));
                }
            }
            else {
                d3.select(this).attr("width", tempWidth)
                               .attr("x", tempMoverMargin);
            }
            updateAxis(false);
            updateMainCircles();
        })
       .on("start", function() {
           d3.select(this).attr("opacity", 0.4);
           moverCenter = moverMargin + moverWidth / 2;
        })
        .on("end", function() {
            moverWidth = d3.select(this).node().getBBox().width;
            moverMargin = d3.select(this).node().getBBox().x;
            moverRatio = moverWidth / viewWidth;
            d3.select(this).attr("opacity", 0.3);
            if(d3.event.transform.k != 1)
                d3.select(this).call(zoom.transform, d3.zoomIdentity.scale(1));
        }))
}

/* ======================================================= */
/* =============== END OF HELPER FUNCTIONS =============== */

