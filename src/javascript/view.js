let cast = d3.select("#program");

let mainView = cast.append("div")
                   .attr("id", "mainViewDiv")
                   .append("svg")
                   .attr("id", "mainView");


let scrollView = cast.append("div")
                     .attr("id", "scrollViewDiv")
                     .append("svg")
                     .attr("id", "scrollView");

