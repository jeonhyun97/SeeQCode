/* =================== PUBLIC FUNCTIONS ================== */
/* ======================================================= */

function initAxis() {

    let axisGTop = mainView.append('g')
                           .attr("id", "top_axis")
                           .attr("transform", translate(margin.left, margin.top))
                           .style("user-select", "none");
    let axisGBottom = mainView.append('g')
                              .attr("id", "bottom_axis")
                              .attr("transform", translate(margin.left, margin.top + mainViewHeight))
                              .style("user-select", "none");

    updateScrollMoverRange();
    updateClassRange();
    
    commitScale = d3.scaleLinear()
                      .domain(scrollMoverRange)
                      .range([0, viewWidth]);

    axisGTop.call(d3.axisBottom(commitScale));
    axisGBottom.call(d3.axisTop(commitScale));
}

function updateAxis(isWindow) {

    if(!isWindow) updateScrollMoverRange();
    else updateClassRange();

    commitScale = d3.scaleLinear()
                  .domain(scrollMoverRange)
                  .range([0, viewWidth]);
    
    
    d3.select("#top_axis").call(d3.axisBottom(commitScale));
    d3.select("#bottom_axis").call(d3.axisTop(commitScale))
                             .attr("transform", translate(margin.left, margin.top + mainViewHeight));
}

/* ======================================================= */
/* =============== END OF PUBLIC FUNCTIONS =============== */


/* =================== HELPER FUNCTIONS ================== */
/* ======================================================= */


function updateScrollMoverRange() {
    let start = d3.select("#scrollRectMover").node().getBBox().x - margin.left;
    let end = start + d3.select("#scrollRectMover").node().getBBox().width;

    scrollMoverRange = [start * totalCommitNum / viewWidth, end * totalCommitNum / viewWidth];
}

function updateClassRange() {
    classScale = d3.scaleLinear()
                   .domain([-3, totalClassNum + 3])
                   .range([0, mainViewHeight]);
}
              
/* ======================================================= */
/* =============== END OF HELPER FUNCTIONS =============== */
