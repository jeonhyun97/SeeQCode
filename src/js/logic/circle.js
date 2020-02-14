/* =================== PUBLIC FUNCTIONS ================== */
/* ======================================================= */

function initMainCircles() {
    mainCircleView = mainView.append("g")
                             .attr("id", "mainCircleView");

    mainUnzippedView = mainView.append("g")
                               .attr("id", "mainUnzippedView");

    mainCircleView.selectAll("circle")
                  .data(filterCommitHistory(), d => d.sha)
                  .join(
                      enter => {
                          enter.append("circle")
                               .attr("class", d => {
                                   let text = "class_ind_".concat(d.class_ind.toString());
                                   return text;
                                })
                               .attr("cx", d => x(d))
                               .attr("cy", d => y(d))
                               .attr("r", d => r(d))
                               .attr("fill", d => d.color)
                               .style("opacity", 0.3)
                               .on("mouseover", classCommitHoverOver)
                               .on("mouseout", classCommitHoverOut)
                               .on("dblclick", classCommitDblclick)
                               .on("mousemove", moveZippedTooltip)
                      }
                  );
}

function updateMainCircles() {
    let defaultOpacity;
    if(clickedClassNum > 0) defaultOpacity = 0.18
    else defaultOpacity = 0.3

    mainCircleView.selectAll("circle")
                  .data(filterCommitHistory(), d => d.sha)
                  .join(
                      enter => {
                          enter.append("circle")
                               .attr("class", d => "class_ind_".concat(d.class_ind.toString()))
                               .attr("cx", d => x(d))
                               .attr("cy", d => y(d))
                               .attr("r", d => r(d))
                               .attr("fill", d => d.color)
                               .style("opacity", defaultOpacity)
                               .on("mouseover", classCommitHoverOver)
                               .on("mouseout", classCommitHoverOut)
                               .on("dblclick", classCommitDblclick)
                               .on("mousemove", moveZippedTooltip);
                      },
                      update => {
                          update.attr("class", d => "class_ind_".concat(d.class_ind.toString()))
                                .attr("cx", d => x(d))
                                .attr("cy", d => y(d));
                      },
                      exit => { exit.remove(); }
                  )
    updateUnzippedMainCircles();
}

function initScrollCircles() {
    scrollCircleView = scrollView.append("g")
                                 .attr("id", "scrollCircleView");

    scrollUnzippedView = scrollView.append("g")
                                   .attr("id", "scrollUnzippedView");
    

    scrollViewCommitScale = d3.scaleLinear()
                                  .domain([0, totalCommitNum])
                                  .range([0, viewWidth])
    scrollViewClassScale  = d3.scaleLinear()
                                  .domain([-3, totalClassNum + 3])
                                  .range([0, d3.select("#scrollView").node().getBBox().height]);

    scrollCircleView.selectAll("circle")
                    .data(commitHistoryZipped)
                    .join(
                        enter => {
                            enter.append("circle")
                                 .attr("class", d => "class_ind_".concat(d.class_ind.toString()))
                                 .attr("cx", d => scrollViewCommitScale(d.commit_ind) + margin.left)
                                 .attr("cy", d => scrollViewClassScale(d.class_ind))
                                 .attr("r", d => r(d) / 8)
                                 .attr("fill", d => d.color)
                                 .style("opacity", 0.3);
                        }
                    );
}

function updateScrollCircles() {

    scrollViewCommitScale = d3.scaleLinear()
                                  .domain([0, totalCommitNum])
                                  .range([0, viewWidth])
    scrollViewClassScale = d3.scaleLinear()
                                 .domain([-3, totalClassNum + 3])
                                 .range([0, d3.select("#scrollView").node().getBBox().height]);

    scrollCircleView.selectAll("circle")
                    .attr("class", d => "class_ind_".concat(d.class_ind.toString()))
                    .attr("cx", d => scrollViewCommitScale(d.commit_ind) + margin.left)
                    .attr("cy", d => scrollViewClassScale(d.class_ind))
                    .attr("r", d => r(d) / 8);
    
    updateUnzippedScrollCircles();

}

/* ======================================================= */
/* =============== END OF PUBLIC FUNCTIONS =============== */


/* =================== HELPER FUNCTIONS ================== */
/* ======================================================= */


function filterCommitHistory() {
    let filterRange = [scrollMoverRange[0] - 5, scrollMoverRange[1] + 5]
    let filteredCommitHistory = commitHistoryZipped.filter(function(d) {
        return d.commit_ind > filterRange[0] && d.commit_ind < filterRange[1];
    });
    return filteredCommitHistory;
}

/* ======================================================= */
/* =============== END OF HELPER FUNCTIONS =============== */
