// For main View

let containerElement = document.getElementById("main_container");

let containerStyle = getComputedStyle(containerElement);

let width = containerElement.clientWidth - 
            parseFloat(containerStyle.paddingLeft) - 
            parseFloat(containerStyle.paddingRight);

console.log(width);

let height = width * 4 / 10;

let margin = {
    top : 10,
    bottom : 10,
    left : 20,
    right : 20
};

let viewWidth = width - margin.left - margin.right;
let viewHeight = height - margin.top - margin.bottom;

console.log(viewHeight);

mainView.attr("width", width)
        .attr("height", height);

let axisGTop = mainView.append('g')
                       .attr("transform", translate(margin.left, margin.top));

let axisGBottom = mainView.append('g')
                          .attr("transform", translate(margin.left, margin.top + viewHeight));

let commitNum = 100;     // Mock value

let scale = d3.scaleLinear()
              .domain([0, commitNum])
              .range([0, viewWidth]);



let axisTop = d3.axisBottom(scale);

let axisBottom = d3.axisTop(scale);


axisGTop.call(axisTop);
axisGBottom.call(axisBottom);


// for scroll View


scrollWidth = width;
scrollHeight = scrollWidth * 0.1;


scrollView.attr("width", scrollWidth)
          .attr("height", scrollHeight);

let scrollRect = scrollView.append("rect");

scrollRect.attr("width", scrollWidth - margin.right - margin.left)
          .attr("height", scrollHeight)
          .attr("x", margin.left)
          .style("stroke", "gray")
          .style("fill", "none")
          .style("stroke-width", 1.0);
          




              