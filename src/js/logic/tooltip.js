
function initTooltips() {
    zippedTooltip = d3.select("#mainViewDiv").append("div");
    zippedTooltip.style("position", "absolute")
                 .style("z-index", "10")
                 .style("visibility", "hidden");

    let zippedTooltipBox = zippedTooltip.append("svg").attr("width", 1000)
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

    let unzippedTooltipBox = unzippedTooltip.append("svg").attr("width", 1000)
                                            .append("g");

    unzippedTooltipRect = unzippedTooltipBox.append("rect")
                                            .attr("id", "unzippedToolTipRect")
                                            .attr("rx", 15)
                                            .attr("ry", 15)
                                            .attr("fill", "#fafff9")
                                            .attr("stroke", "black")
                                            .attr("stroke-width", 2.5);

    unzippedTooltipText = unzippedTooltipBox.append("text")
                                            .attr("fill", "black")
                                            .attr("y", 25)
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
    textData.push("score_sum: " + score.toFixed(3));
    textData.push("cardinality: " + zipNum);
    
    zippedTooltipText.selectAll("tspan").remove();
    zippedTooltipText.append("tspan").text(textData[0])
                     .attr("dy", 0).attr("x", 15)
                     .style("font", "bold 16px Courier New")
                     .style("fill", d.color);
    for(let i = 1; i < textData.length; i++) 
        zippedTooltipText.append("tspan").text(textData[i]).attr("dy", 20).attr("x", 25);

    let boxWidth = 30 + zippedTooltipText.node().getBBox().width;
    let boxHeight = 25 + zippedTooltipText.node().getBBox().height;
    zippedTooltipRect.attr("width", boxWidth)
                     .attr("height", boxHeight);

    zippedTooltip.style("visibility", "visible");
}

function moveZippedTooltip() {
    zippedTooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+30)+"px");
}

function hideZippedTooltip() {
   zippedTooltip.style("visibility", "hidden");
}

function showUnzippedTooltip(d) {

    let signature = d.class_name;
    if(d.class_mod != "NONE") signature = d.class_mod + " " + signature;
    let score = d.score;
    let author = d.info.author;
    let branch = d.info.branch;
    let sha = d.sha;
    let rawdate = d.info.date;
    let date;
    switch(rawdate.slice(4,6)) {
        case "01" : date = "January "; break;
        case "02" : date = "February "; break;
        case "03" : date = "March "; break;
        case "04" : date = "April "; break;
        case "05" : date = "May "; break;
        case "06" : date = "June "; break;
        case "07" : date = "July "; break;
        case "08" : date = "August "; break;
        case "09" : date = "September "; break;
        case "10" : date = "October "; break;
        case "11" : date = "November "; break;
        case "12" : date = "December "; break;
    }
    date += rawdate.slice(6,8) + ", "
    date += rawdate.slice(0,4) + ".";

    let message = d.info.message;

    let textData = new Array();
    textData.push(signature);
    textData.push("author: " + author);
    textData.push("score: " + score.toFixed(3));
    textData.push("branch: " + branch + " (" + sha + ")");
    textData.push("date: " + date);
    textData.push(message.slice(11));  // mock

    unzippedTooltipText.selectAll("tspan").remove();
    unzippedTooltipText.append("tspan").text(textData[0])
                     .attr("dy", 0).attr("x", 15)
                     .style("font", "bold 16px Courier New")
                     .style("fill", d.color);
    for(let i = 1; i < textData.length - 1; i++) 
        unzippedTooltipText.append("tspan").text(textData[i]).attr("dy", 20).attr("x", 25);
    unzippedTooltipText.append("tspan").text(textData[textData.length - 1])
                       .attr("dy", 20).attr("x", 23)
                       .style("font", "italic 15px PT Sans")
                       .style("fill", "#0000aa");
    let boxWidth = 30 + unzippedTooltipText.node().getBBox().width;
    let boxHeight = 25 + unzippedTooltipText.node().getBBox().height;
    unzippedTooltipRect.attr("width", boxWidth)
                     .attr("height", boxHeight);

    unzippedTooltip.style("visibility", "visible");
}


function moveUnzippedTooltip() {
    unzippedTooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+30)+"px");
}

function hideUnzippedTooltip() {
    unzippedTooltip.style("visibility", "hidden");
}



