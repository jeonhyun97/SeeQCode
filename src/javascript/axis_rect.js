
// variables for main view

let axisGTop, axisGBottom;
let currentCommitNum;
let currentScale;
let scrollMoverRange;

// variables for scroll View
let scrollRect;
let scrollRectWidth;

// setting commit Number (will be revised)

function initCommitNum() {
    getTotalCommitNum();
    currentCommitNum = totalCommitNum;
}

// For main View

function updateScrollMoverRange() {
    let start = d3.select("#scrollRectMover").node().getBBox().x - margin.left;
    let end = start + d3.select("#scrollRectMover").node().getBBox().width;

    scrollMoverRange = [start * totalCommitNum / scrollRectWidth, end * totalCommitNum / scrollRectWidth];
}

function initMainViewAxis() {
    initCommitNum();

    axisGTop = mainView.append('g')
                       .attr("transform", translate(margin.left, margin.top));
    axisGBottom = mainView.append('g')
                          .attr("transform", translate(margin.left, margin.top + viewHeight));

    updateScrollMoverRange();
    
    let scale = d3.scaleLinear()
                      .domain(scrollMoverRange)
                      .range([0, viewWidth]);

    axisGTop.call(d3.axisBottom(scale));
    axisGBottom.call(d3.axisTop(scale));
}

function updateMainViewAxis() {
    let scale = d3.scaleLinear()
                  .domain(scrollMoverRange)
                  .range([0, viewWidth]);

    axisGBottom.attr("transform", translate(margin.left, margin.top + viewHeight));
    
    axisGTop.call(d3.axisBottom(scale));
    axisGBottom.call(d3.axisTop(scale));
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




              