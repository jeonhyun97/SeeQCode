
function x(d) { return commitScale(d.commit_ind) + margin.left }
function y(d) { return classScale(d.class_ind) + margin.top }
function r(d) { return (d.score * 7)}


// variables for drawing circles which denote contribution

let mainCircleView;
let scrollCircleView;

function filterCommitHistory() {
    let filterRange = [scrollMoverRange[0] - 5, scrollMoverRange[1] + 5]
    let filteredCommitHistory = commit_history_zipped.filter(function(d) {
        return d.commit_ind > filterRange[0] && d.commit_ind < filterRange[1];
    });
    return filteredCommitHistory;
}

function initMainViewCircles() {
    mainCircleView = mainView.append("g")
                             .attr("id", "mainCircleView");

    let filteredCommitHistory = filterCommitHistory();

    mainCircleView.selectAll("circle")
                  .data(filteredCommitHistory, d => d.sha)
                  .join(
                      enter => {
                          enter.append("circle")
                               .attr("class", d => "class_ind_".concat(d.class_ind.toString()))
                               .attr("cx", d => x(d))
                               .attr("cy", d => y(d))
                               .attr("r", d => r(d))
                               .style("opacity", 0.35)
                               .attr("fill", d => d.color);
                               //.on("mouseover", class_commit_hover_over)
                               //.on("mouseout", class_commit_hover_out);
                               // hovering: after...

                      }
                  )
    
}

function updateMainViewCircles() {

    let filteredCommitHistory = filterCommitHistory();

    mainCircleView.selectAll("circle")
                  .data(filteredCommitHistory, d => d.sha)
                  .join(
                      enter => {
                          enter.append("circle")
                               .attr("class", d => "class_ind_".concat(d.class_ind.toString()))
                               .attr("cx", d => x(d))
                               .attr("cy", d => y(d))
                               .attr("r", d => r(d))
                               .style("opacity", 0.35)
                               .attr("fill", d => d.color);
                      },
                      update => {
                          update.attr("cx", d => x(d))
                                .attr("cy", d => y(d));
                      },
                      exit => { exit.remove(); }
                  )
}

function initScrollViewCircles() {
    scrollCircleView = scrollView.append("g")
                                 .attr("id", "scrollCircleView");
    
    let scrollViewCommitScale = d3.scaleLinear()
                                  .domain([0, totalCommitNum])
                                  .range([0, viewWidth])
    let scrollViewClassScale = d3.scaleLinear()
                                 .domain([-3, totalClassNum + 3])
                                 .range([0, d3.select("#scrollView").node().getBBox().height]);

    
    scrollCircleView.selectAll("circle")
                    .data(commit_history_zipped)
                    .join(
                        enter => {
                            enter.append("circle")
                                 .attr("cx", d => scrollViewCommitScale(d.commit_ind) + margin.left)
                                 .attr("cy", d => scrollViewClassScale(d.class_ind))
                                 .attr("r", d => r(d) / 8)
                                 .style("opacity", 0.35)
                                 .attr("fill", d => d.color);
                        }
                    )

}

function updateScrollViewCircles() {

    let scrollViewCommitScale = d3.scaleLinear()
                                  .domain([0, totalCommitNum])
                                  .range([0, viewWidth])
    let scrollViewClassScale = d3.scaleLinear()
                                 .domain([-3, totalClassNum + 3])
                                 .range([0, d3.select("#scrollView").node().getBBox().height]);

    
    scrollCircleView.selectAll("circle")
                    .attr("cx", d => scrollViewCommitScale(d.commit_ind) + margin.left)
                    .attr("cy", d => scrollViewClassScale(d.class_ind))
                    .attr("r", d => r(d) / 8);

    
}
