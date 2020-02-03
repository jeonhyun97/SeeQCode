

function score (info) {
    return (info.code_smell + info.metric + info.documentation + info.test_coverage) / 4;
}




let width = 16000;
let height = 1000;



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


let colors = ["#0000FF", "#A52A2A", "#006400", "#8B008B", "#696969", "#DAA520", "#ADD8E6"];

let author2Color = new Map();

let i = 0;
authors.forEach(e => {
    author2Color.set(e, colors[i]);
    i++;
})


let test_svg = d3.selectAll("div")
                 .append("svg")
                 .attr("width", width)
                 .attr("height", height);

let commit_history_ziped = new Array();
let current_i = 0;
let current_author = commit_history[0].info.author;
let current_stack = new Array();

for(let i = 0; i < commit_history.length; i++) {
    if(current_i == commit_history[i].class_ind &&
       current_author == commit_history[i].info.author) {
        current_stack.push(commit_history[i]);
    }
    else {
        let j_sum = 0;
        let score_sum = 0;
        let cardinality = current_stack.length;
        while(current_stack.length != 0) {
            element = current_stack.pop();
            j_sum += element.commit_ind;
            score_sum += element.score;
        }
        let j_average = j_sum / cardinality;
        let score_average = Math.sqrt(score_sum);
        commit_history_ziped.push({
            class_ind : current_i,
            commit_ind : j_average,
            score : score_average,
            color : author2Color.get(current_author)
        });
        current_i = commit_history[i].class_ind;
        current_author = commit_history[i].info.author;
        current_stack.push(commit_history[i]);
    }
}


test_svg.selectAll("circle")
        .data(commit_history_ziped)
        .join(
            enter => {
                enter.append("circle")
                     .attr("cx", d => (d.commit_ind + 1) * 6)
                     .attr("cy", d => (d.class_ind + 1) * 17 + 30)
                     .attr("r", d => d.score * 6)
                     .style("opacity", 0.5)
                     .attr("fill", d => d.color);
            }
        )


        let test_svg2 = d3.selectAll("div")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

test_svg2.selectAll("circle")
        .data(commit_history)
        .join(
            enter => {
                enter.append("circle")
                     .attr("cx", d => (d.commit_ind + 1) * 6)
                     .attr("cy", d => (d.class_ind + 1) * 17 + 30)
                     .attr("r", d => d.score * 6)
                     .style("opacity", 0.5)
                     .attr("fill", d => author2Color.get(d.info.author));
            }
        )

let test_svg3 = d3.selectAll("div")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

test_svg3.selectAll("circle")
        .data(commit_history)
        .join(
            enter => {
                enter.append("circle")
                     .attr("cx", d => (d.commit_ind + 1) * 6)
                     .attr("cy", d => (d.class_ind + 1) * 17 + 30)
                     .attr("r", d => d.score * 6)
                     .style("opacity", 0.5)
                     .attr("fill", d => author2Color.get(d.info.author));
            }
        )

test_svg3.selectAll("#circle2")
        .data(commit_history_ziped)
        .join(
            enter => {
                enter.append("circle")
                     .attr("id", "circle2")
                     .attr("cx", d => (d.commit_ind + 1) * 6)
                     .attr("cy", d => (d.class_ind + 1) * 17 + 30)
                     .attr("r", d => d.score * 6)
                     .attr("fill", d => d.color)
                     .attr("stroke", "black")
                     .attr("stroke-width", "3");
            }
        )