
// variables for main view

let commitNum;

let axisTopG, axisBottomG;
let axisTop, axisBottom;

let scale;

// setting commit Number (will be revised)

function setCommitNum() {
    commitNum = 100;        // mock value
}

// For main View

function initMainViewAxis() {
    setCommitNum();

    axisGTop = mainView.append('g')
                       .attr("transform", translate(margin.left, margin.top));
    axisGBottom = mainView.append('g')
                          .attr("transform", translate(margin.left, margin.top + viewHeight));

    scale = d3.scaleLinear()
              .domain([0, commitNum])
              .range([0, viewWidth]);

    axisTop = d3.axisBottom(scale);
    axisBottom = d3.axisTop(scale);
    axisGTop.call(axisTop);
    axisGBottom.call(axisBottom);
}

// variables for scroll View
let scrollRect;

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


          




              