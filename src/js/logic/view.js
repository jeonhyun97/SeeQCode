
/* =================== PUBLIC FUNCTIONS ================== */
/* ======================================================= */

function initView() {
    let program = d3.select("#program");

    mainView = program.append("div")
                       .attr("id", "mainViewDiv")
                       .append("svg")
                       .attr("id", "mainView");

    scrollView = program.append("div")
                        .attr("id", "scrollViewDiv")
                        .append("svg")
                        .attr("id", "scrollView");
                        
    updateSize();
}

function updateSize() {
    let size = calculateSize();

    mainView.attr("width", size.width)
            .attr("height", size.height);
    
    viewWidth = size.viewWidth;
    mainViewHeight = size.viewHeight;
    scrollViewHeight = size.width * 0.07 > 70 ? size.width * 0.07 : 70;
    
    scrollView.attr("width", size.width)
              .attr("height", scrollViewHeight);
}

/* ======================================================= */
/* =============== END OF PUBLIC FUNCTIONS =============== */

/* =================== HELPER FUNCTION ================== */
/* ======================================================= */

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

/* ======================================================= */
/* =============== END OF HELPER FUNCTION =============== */



