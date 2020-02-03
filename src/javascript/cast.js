



let width = 1100;
let height = 500;

let main_svg = d3.selectAll("div")
                 .append("svg")
                 .attr("width", width)
                 .attr("height", height);


// for debugging

let classes_history = new Array();
let commit_history = new Array();

for(let i = 0; i < SeeQ_data.length; i++) {
    let current_commits = SeeQ_data[i].commits;
    classes_history.push({ 
        name : SeeQ_data[i].name, 
        commits : current_commits
    });
    for(let j = 0; j < current_commits.length; j++) {
        commit_history.push({
            class_ind : i,
            commit_ind : j,
            info : current_commits[j]
        });
    }
}

console.log(classes_history);
console.log(commit_history);


var colorRange = ['#f5f5f5', '#00ff']
var color = d3.scaleLinear().range(colorRange).domain([0, 1]);

var radialGradient = main_svg.append("defs")
        .append("radialGradient")
        .attr("id", "radial-gradient");
    
radialGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", color(1));
    
radialGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", color(0));

main_svg.selectAll("circle")
        .data(commit_history)
        .join(
            enter => {
                enter.append("circle")
                     .attr("cx", d => (d.commit_ind + 1) * 50)
                     .attr("cy", d => (d.class_ind + 1) * 50)
                     .attr("r", 15)
                     .style("opacity", 1.0)
                     .style("fill", "url(#radial-gradient)");
            }
        )

console.log(classes_history);