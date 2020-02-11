// variables for view cast
let program;
let mainView;
let scrollView;

// variables to indicate the size of view
let viewWidth, viewHeight;
let scrollWidth, scrollHeight;

let originalViewWidth, originalViewHeight;
let originalScrollWidth, originalScrollHeight;

let margin = {
    top : 10,
    bottom : 10,
    left : 20,
    right : 20
};


function initViewContainers() {
    program = d3.select("#program");

    mainView = program.append("div")
                       .attr("id", "mainViewDiv")
                       .append("svg")
                       .attr("id", "mainView");

    scrollView = program.append("div")
                        .attr("id", "scrollViewDiv")
                        .append("svg")
                        .attr("id", "scrollView");
}


function calculateSize() {

    let containerElement = document.getElementById("main_container");
    let containerStyle = getComputedStyle(containerElement);

    let width = containerElement.clientWidth - 
            parseFloat(containerStyle.paddingLeft) - 
            parseFloat(containerStyle.paddingRight);

    let height = width * 4 / 10;
    if (height < 350) height = 350;

    return { 
        width : width, 
        height : height,
        viewWidth : width - margin.left - margin.right,
        viewHeight : height - margin.top - margin.bottom
    };
}

function initSize() {
    updateSize();
}

function updateSize() {
    let size = calculateSize();

    mainView.attr("width", size.width)
            .attr("height", size.height);
    
    viewWidth = size.viewWidth;
    viewHeight = size.viewHeight;
    scrollWidth = size.width;
    scrollHeight = scrollWidth * 0.07 > 70 ? scrollWidth * 0.07 : 70;
    
    scrollView.attr("width", scrollWidth)
              .attr("height", scrollHeight);
}


