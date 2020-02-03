

function score (info) {
    return (info.code_smell + info.metric + info.documentation + info.test_coverage) / 4;
}


let width = 16000;
let height = 1000;

let main_svg = d3.selectAll("div")
                 .append("svg")
                 .attr("width", width)
                 .attr("height", height);


// for debugging

let classes_history = new Array();
let commit_history = new Array();
let authors = new Set();

for(let i = 0; i < SeeQ_data.length; i++) {
    let current_commits = SeeQ_data[i].commits;
    classes_history.push({ 
        name : SeeQ_data[i].name, 
        commits : current_commits
    });
    for(let j = 0; j < current_commits.length; j++) {
        commit_history.push({
            class_ind : i,
            commit_ind : current_commits[j].num,
            score : score(current_commits[j].score),
            info : current_commits[j]
        });
        authors.add(current_commits[j].author);
    }
}

console.log(authors);

let colors = ["#0000FF", "#A52A2A", "#006400", "#8B008B", "#696969", "#DAA520", "#ADD8E6"];

let author2Color = new Map();

let i = 0;
authors.forEach(e => {
    author2Color.set(e, colors[i]);
    i++;
})

console.log(author2Color);

author2Color.forEach(function(value, key) {
    console.log(key);
    console.log(value);
    var radialGradient = main_svg.append("defs").append("radialGradient").attr("id", "radial-gradient-".concat(key));    
    radialGradient.append("stop").attr("offset", "0%").attr("stop-color", value);
    radialGradient.append("stop").attr("offset", "100%").attr("stop-color", "#ffffff");
})

console.log(commit_history);

main_svg.selectAll("circle")
        .data(commit_history)
        .join(
            enter => {
                enter.append("circle")
                     .attr("cx", d => (d.commit_ind + 1) * 20)
                     .attr("cy", d => (d.class_ind + 1) * 20)
                     .attr("r", d => d.score * 1.3)
                     .style("opacity", 1.0)
                     .attr("fill", d => ("url(#radial-gradient-".concat(d.info.author).concat(")")));
            }
        )

console.log(classes_history);