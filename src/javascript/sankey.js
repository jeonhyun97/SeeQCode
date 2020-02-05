
let margin = {
    top : 10, 
    right : 10, 
    bottom : 10, 
    left : 10
};

let svgWidth = 1000;
let svgHeight = 780;
let Width = svgWidth - margin.left - margin.right;
let Height = svgHeight - margin.top - margin.bottom;


let svg = d3.select("#test_sankey")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .append("g")
            .attr("transform", translate(margin.left, margin.top))
            .attr("width", Width)
            .attr("height", Height);



function zip_sankey_commit_data(current_commits) {
    let current_author = current_commits[0].author;
    let stack = new Array();
    let result = new Array();
    for(let i = 0; i < current_commits.length; i++) {
        if(current_author == current_commits[i].author) {
            stack.push(current_commits[i]);
        }
        else {
            let size = stack.length;
            let score_sum = 0;
            let index_sum = 0;
            while(stack.length > 0) {
                let ele = stack.pop();
                score_sum += score(ele.score);
                index_sum += ele.num;
            }
            result.push({
                "index" : index_sum / size,
                "score" : Math.sqrt(score_sum),
                "author" : current_author
            })
            stack.push(current_commits[i]);
            current_author = current_commits[i].author;
        }
    }
    return result;
}

function find_author_name(id) {
    let hypon_num = 0;
    for(let i = 0; i < id.length; i++) {
        if(hypon_num == 2) return id.slice(i);
        if(id[i] == "_") hypon_num++;
    }
}


function generate_sankey_data() {
    let nodes = new Array();
    let links = new Array();

    for(let ind = 0; ind < SeeQ_data.length; ind++) {
        let current_commits = SeeQ_data[ind].commits;
        current_commits = zip_sankey_commit_data(current_commits);

        let class_index = ind + "_";
        nodes.push({"id" : class_index + current_commits[0].index+ "_" + current_commits[0].author});
        for(let i = 1; i < current_commits.length; i++) {
            let previous_name = class_index + current_commits[i - 1].index + "_" + current_commits[i - 1].author;
            let current_name = class_index + current_commits[i].index + "_" + current_commits[i].author;
            nodes.push({"id" : current_name});
            links.push({
                "source" : previous_name,
                "target" : current_name,
                "value" : current_commits[i-1].score
            });
        }
    }
    return {nodes, links};
}

sankey = d3.sankey()
           .nodeId(d => d.id)
           .size([Width, Height])
           .nodeWidth(10)

let {nodes, links} = sankey(generate_sankey_data());

console.log(nodes);
svg.selectAll("rect")
   .data(nodes)
   .join(
       enter => {
           enter.append("rect")
                .attr("x", d => d.x0)
                .attr("y", d => d.y0)
                .attr("height", d => d.y1 - d.y0)
                .attr("width", d => d.x1 - d.x0)
                .attr("fill", d => author2Color.get(find_author_name(d.id)));
       }
   );

let curveFunc = d3.area()
                  .curve(d3.curveBasis)
                  .x(d => d.x)
                  .y1(d => d.y1)
                  .y0(d => d.y0);


function findClassNum(id) {
    for(let i = 0; i < id.length; i++) {
        if(id[i] == "_") return Number(id.slice(0, i));
    }
}


function generateSankeyAreaData() {
    let data = new Array();
    let delta = 1/10
    let current_class = findClassNum(nodes[0].id);
    for(let i = 0; i < nodes.length - 1; i++) {
        if(current_class != findClassNum(nodes[i + 1].id)) {
            current_class = findClassNum(nodes[i + 1].id);
            continue;
        }
        let subArray = new Array();
        subArray.push({
            x : nodes[i].x1, 
            y1 : nodes[i].y0, 
            y0 : nodes[i].y1,
            color : author2Color.get(find_author_name(nodes[i].id)),
            index : i
        });
        subArray.push({
            x : (3 * nodes[i].x1 + nodes[i + 1].x0) / 4,
            y1 : nodes[i].y0 + (nodes[i + 1].y0 - nodes[i].y0) * (1/3 + delta),
            y0 : nodes[i].y1 + (nodes[i + 1].y1 - nodes[i].y1) * (1/3 + delta),
        })
        subArray.push({
            x : (nodes[i].x1 + 3 * nodes[i + 1].x0) / 4,
            y1 : nodes[i].y0 + (nodes[i + 1].y0 - nodes[i].y0) * (3/4 - delta),
            y0 : nodes[i].y1 + (nodes[i + 1].y1 - nodes[i].y1) * (3/4 - delta),

        })
        subArray.push({
            x : nodes[i + 1].x0,
            y1 : nodes[i + 1].y0,
            y0 : nodes[i + 1].y1,
            color : author2Color.get(find_author_name(nodes[i+1].id))
        });
        data.push(subArray);
    }
    return data;
}

let data = generateSankeyAreaData();
console.log(data);

svg.selectAll('path')
   .data(data)
   .join(
       enter => {
           let gradients = enter.append('defs')
                                .append('linearGradient')
                                .attr('id', d => 'gradient' + d[0].index);
           gradients.append('stop')
                    .attr('class', 'start')
                    .attr('offset', '0%')
                    .attr('stop-color', d => d[0].color);

           gradients.append('stop')
                    .attr('class', 'start')
                    .attr('offset', '50%')
                    .attr('stop-color', d => "#aaaaaa");
           
           gradients.append('stop')
                    .attr('class', 'start')
                    .attr('offset', '100%')
                    .attr('stop-color', d => d[3].color);
            
           enter.append('path')
                .attr('d', d => curveFunc(d))
                .attr('stroke', 'none')
                .attr('opacity', 0.5)
                .attr('fill', d => 'url(#gradient' + d[0].index + ")");
       }
   )

   

/*
let paths = svg.append("g")
               .attr("fill", "none")
               .attr("stroke-opacity", 0.4)
               .selectAll("g")
               .data(links)
               .join("g")
               .style("mix-blend-mode", "multiply");


paths.append("path")
     .attr("d", d3.sankeyLinkHorizontal())
     .attr("stroke", "black")
     .attr("stroke-width", function(d, i){
         console.log(nodes[i].y1 - nodes[i].y0);
         console.log(nodes[i + 1].y1 - nodes[i + 1].y0);
         return d.width;
     });
     
*/





