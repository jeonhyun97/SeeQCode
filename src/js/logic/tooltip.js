
function initTooltips() {
    zippedTooltip = d3.select("#mainViewDiv").append("div");
    zippedTooltip.style("position", "absolute")
                 .style("z-index", "10")
                 .style("visibility", "hidden");

    let zippedTooltipBox = zippedTooltip.append("svg")
                                    .append("g");

    zippedTooltipRect = zippedTooltipBox.append("rect")
                                        .attr("id", "zippedToolTipRect")
                                        .attr("width", 100)
                                        .attr("height", 70)
                                        .attr("fill", "white")
                                        .attr("stroke", "black")
                                        .attr("stroke-width", 3.0);

    zippedTooltipText = zippedTooltipBox.append("text")
                                        .attr("fill", "black")
                                        .attr("y", 25);
    

    unzippedTooltip = d3.select("#mainViewDiv").append("div");
    unzippedTooltip.style("position", "absolute")
                   .style("z-index", "10")
                   .style("visibility", "hidden")

    let unzippedTooltipBox = unzippedTooltip.append("svg")
                                            .append("g");

    unzippedTooltipRect = unzippedTooltipBox.append("rect")
                                            .attr("id", "zippedToolTipRect")
                                            .attr("width", 100)
                                            .attr("height", 70)
                                            .attr("fill", "white")
                                            .attr("stroke", "black")
                                            .attr("stroke-width", 3.0);

    unzippedTooltipText = unzippedTooltipBox.append("text")
                                            .attr("fill", "black")
                                            .attr("x", 15)
                                            .attr("y", 20);
    
}

function showZippedTooltip(d) {
    console.log(d);

    
    let text1 = "This is the test text text text sss";
    let text2 = "Gae Kul JAM JAM";
    let text3 = "BABBAB"
    let text4 = "This is the testss";
    zippedTooltipText.selectAll("tspan").remove();
    zippedTooltipText.append("tspan").text(text1).attr("dy", 0).attr("x", 15);
    zippedTooltipText.append("tspan").text(text2).attr("dy", 20).attr("x", 15);
    zippedTooltipText.append("tspan").text(text3).attr("dy", 20).attr("x", 15);
    zippedTooltipText.append("tspan").text(text4).attr("dy", 20).attr("x", 15);


    let textMaxLength = zippedTooltipText.node().getBBox().width;
    let boxWidth = 30 + textMaxLength;
    zippedTooltipRect.attr("width", boxWidth);

    let boxHeight = 25 + zippedTooltipText.node().getBBox().height;
    zippedTooltipRect.attr("height", boxHeight);

    zippedTooltip.style("visibility", "visible");
}

function moveZippedTooltip() {
    zippedTooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+30)+"px");
}

function hideZippedTooltip() {
   zippedTooltip.style("visibility", "hidden");
}

function showUnzippedTooltip() {
    unzippedTooltip.style("visibility", "visible");
}


function moveUnzippedTooltip() {
    unzippedTooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+30)+"px");
}

function hideUnzippedTooltip() {
    unzippedTooltip.style("visibility", "hidden");
}



