
// variables for main view

let axisGTop, axisGBottom;
let originalScale;
let currentCommitNum;

// variables for scroll View
let scrollRect;

// setting commit Number (will be revised)

function initCommitNum() {
    getTotalCommitNum();
    currentCommitNum = totalCommitNum;
}

// For main View

function initMainViewAxis() {
    initCommitNum();

    axisGTop = mainView.append('g')
                       .attr("transform", translate(margin.left, margin.top));
    axisGBottom = mainView.append('g')
                          .attr("transform", translate(margin.left, margin.top + viewHeight));

    originalScale = d3.scaleLinear()
                      .domain([0, totalCommitNum])
                      .range([0, viewWidth]);

    axisGTop.call(d3.axisBottom(originalScale));
    axisGBottom.call(d3.axisTop(originalScale));
}

function updateMainViewAxis() {
    let scale = d3.scaleLinear()
                  .domain([0, currentCommitNum])
                  .range([0, viewWidth]);

    axisGBottom.attr("transform", translate(margin.left, margin.top + viewHeight));
    
    axisGTop.call(d3.axisBottom(scale));
    axisGBottom.call(d3.axisTop(scale));
}

// for scroll View

function initScrollViewRect() {
    scrollRect = scrollView.append("rect");

    scrollRect.attr("width", scrollWidth - margin.right - margin.left)
              .attr("height", scrollHeight)
              .attr("x", margin.left)
              .style("stroke", "gray")
              .style("fill", "none")
              .style("stroke-width", 1.0);
}

function updateScrollViewRect() {
    scrollRect.attr("width", scrollWidth - margin.right - margin.left)
              .attr("height", scrollHeight)
}

// window resizing

$(window).resize(function() {
    updateSize();
    updateMainViewAxis();
    updateScrollViewRect();
})
          




              