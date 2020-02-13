
function initTooltips() {
    zippedTooltip = d3.select("#mainViewDiv").append("div");
    zippedTooltip.style("position", "absolute")
                 .style("z-index", "10")
                 .style("visibility", "hidden");

    let zippedTooltipBox = zippedTooltip.append("svg")
                                    .append("g");

    zippedTooltipRect = zippedTooltipBox.append("rect")
                                        .attr("id", "zippedToolTipRect")
                                        .attr("rx", 15)
                                        .attr("ry", 15)
                                        .attr("fill", "#f2efff")
                                        .attr("stroke", "black")
                                        .attr("stroke-width", 2.5);

    zippedTooltipText = zippedTooltipBox.append("text")
                                        .attr("fill", "black")
                                        .attr("y", 25)
                                        .style("user-select", "none");
    

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
                                            .attr("y", 20)
                                            .style("user-select", "none");
    
}

function showZippedTooltip(d) {

    let signature = d.class_name;
    if(d.class_mod != "NONE") signature = d.class_mod + " " + signature;
    let score = d.score * d.score;
    let author = d.author;
    let zipNum = d.origins.length;


    let textData = new Array();
    textData.push(signature);
    textData.push("author: " + author);
    textData.push("score: " + score);
    textData.push("cardinality: " + zipNum);
    
    
    zippedTooltipText.selectAll("tspan").remove();

    zippedTooltipText.append("tspan").text(textData[0])
                     .attr("dy", 0).attr("x", 15)
                     .style("font", "bold 16px Courier New")
                     .style("fill", d.color);
    for(let i = 1; i < textData.length; i++) 
        zippedTooltipText.append("tspan").text(textData[i]).attr("dy", 20).attr("x", 25);


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



