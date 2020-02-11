
// variables for main view

let axisGTop, axisGBottom;
let currentCommitNum;
let scrollMoverRange;

// variables for scroll View
let scrollRect;
let scrollRectWidth;

// scale variables ( x, y direction )
let commitScale;    // x axis
let classScale;     // y axis

function calculateBasicInfos() {
    getTotalCommitNum();
    getTotalClassNum();
    currentCommitNum = totalCommitNum;
}

// For main View

function updateScrollMoverRange() {
    let start = d3.select("#scrollRectMover").node().getBBox().x - margin.left;
    let end = start + d3.select("#scrollRectMover").node().getBBox().width;

    scrollMoverRange = [start * totalCommitNum / scrollRectWidth, end * totalCommitNum / scrollRectWidth];
}

function updateClassRange() {
    classScale = d3.scaleLinear()
                   .domain([-3, totalClassNum + 3])
                   .range([0, viewHeight]);
}

function initMainViewAxis() {
    calculateBasicInfos();

    axisGTop = mainView.append('g')
                       .attr("transform", translate(margin.left, margin.top));
    axisGBottom = mainView.append('g')
                          .attr("transform", translate(margin.left, margin.top + viewHeight));

    updateScrollMoverRange();
    
    commitScale = d3.scaleLinear()
                      .domain(scrollMoverRange)
                      .range([0, viewWidth]);

    updateClassRange();
    axisGTop.call(d3.axisBottom(commitScale));
    axisGBottom.call(d3.axisTop(commitScale));
}

function updateMainViewAxis() {
    commitScale = d3.scaleLinear()
                  .domain(scrollMoverRange)
                  .range([0, viewWidth]);

    axisGBottom.attr("transform", translate(margin.left, margin.top + viewHeight));
    
    axisGTop.call(d3.axisBottom(commitScale));
    axisGBottom.call(d3.axisTop(commitScale));
}

// for scroll View

function initScrollViewRect() {
    scrollRect = scrollView.append("rect");

    scrollRectWidth = scrollWidth - margin.right - margin.left;

    scrollRect.attr("width", scrollWidth - margin.right - margin.left)
              .attr("height", scrollHeight)
              .attr("x", margin.left)
              .style("stroke", "gray")
              .style("fill", "none")
              .style("stroke-width", 1.0);
}

function updateScrollViewRect() {
    scrollRectWidth = scrollWidth - margin.right - margin.left;
    scrollRect.attr("width", scrollRectWidth)
              .attr("height", scrollHeight)
}




              