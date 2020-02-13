// number of class clicked (unzipped)
let clickedClassNum = 0;

// number of the transitions that should not be disturbed
let inTransition = 0;


function classCommitHoverOver(d, i) {
    if(clickedClassNum == 0) {
        mainView.selectAll("circle")
                .transition()
                .duration(400)
                .style("opacity", 0.18);
    }

    d3.selectAll(".class_ind_".concat(d.class_ind.toString()))
      .transition()
      .duration(100)
      .style("opacity", 1.0);
    
    d3.selectAll(".class_ind_".concat(d.class_ind.toString())).raise();

    showZippedTooltip(d);
    
}

function classCommitHoverOut(d, i) {

    if(clickedClassNum > 0) {
        d3.selectAll(".class_ind_".concat(d.class_ind.toString()))
        .transition()
        .duration(400)
        .style("opacity", 0.18);
    }
    else {
        d3.selectAll("circle")
          .transition()
          .duration(400)
          .style("opacity", 0.3);
    }

    hideZippedTooltip();

}

function unzippedClassCommitHoverOver(d, i) {
    if(inTransition > 0) return;
    d3.selectAll(".unzipped_class_ind_".concat(d.zipped.class_ind.toString()))
      .transition()
      .duration(100)
      .style("opacity", 1.0);
    
      d3.selectAll(".unzipped_class_ind_".concat(d.zipped.class_ind.toString())).raise();

    showUnzippedTooltip(d.unzipped);
}

function unzippedClassCommitHoverOut(d, i) {
    if(inTransition > 0) return;
    d3.selectAll(".unzipped_class_ind_".concat(d.zipped.class_ind.toString()))
      .transition()
      .duration(100)
      .style("opacity", 0.75);

    hideUnzippedTooltip();
}

function classCommitClick(d, i) {
    if(clickedClassNum == 0) commitHistoryUnzipped = new Array();
    let commitHistoryUnzippedTemp = new Array();
    clickedClassNum++;
    commitHistoryZipped.forEach(e => {
        if(e.class_ind == d.class_ind)
            e.origins.forEach(f => {
                commitHistoryUnzippedTemp.push({
                    zipped : e,
                    unzipped : f
                });
            });
    })
    commitHistoryUnzipped = commitHistoryUnzipped.concat(commitHistoryUnzippedTemp);
    mainUnzippedView.selectAll(".unzipped_class_ind_".concat(d.class_ind.toString()))
            .data(filterCommitHistoryUnzipped(commitHistoryUnzippedTemp), d => d.unzipped.sha)
            .join(
                enter =>  {
                    inTransition++;
                    setTimeout(() => { inTransition--; }, 700);

                    enter.append("circle")
                         .attr("class", d => "unzipped_class_ind_".concat(d.zipped.class_ind.toString()))
                         .attr("cx", d => x(d.zipped))
                         .attr("cy", d => y(d.zipped))
                         .attr("r", d => r(d.zipped))
                         .attr("fill", d => d.zipped.color)
                         .style("opacity", 1)
                         .on("mouseover", unzippedClassCommitHoverOver)
                         .on("mouseout", unzippedClassCommitHoverOut)
                         .on("dblclick", unzippedClassCommitDblclick)
                         .on("mousemove", moveUnzippedTooltip)
                         .transition()
                         .duration(700)
                         .attr("cx", d => x(d.unzipped))
                         .attr("cy", d => y(d.unzipped))
                         .attr("r", d =>  rz(d.unzipped))
                         .style("opacity", 0.75)
                },
            )
    
    scrollUnzippedView.selectAll(".unzipped_class_ind_".concat(d.class_ind.toString()))
                    .data(commitHistoryUnzipped, d => d.unzipped.sha)
                    .join(
                        enter => {
                            enter.append("circle")
                                 .attr("class", d => "unzipped_class_ind_".concat(d.zipped.class_ind.toString()))
                                 .attr("cx", d => scrollViewCommitScale(d.zipped.commit_ind) + margin.left)
                                 .attr("cy", d => scrollViewClassScale(d.zipped.class_ind))
                                 .attr("r", d => r(d.zipped) / 8)
                                 .attr("fill", d => d.zipped.color)
                                 .style("opacity", 1)
                                 .transition()
                                 .duration(700)
                                 .attr("cx", d => scrollViewCommitScale(d.unzipped.commit_ind) + margin.left)
                                 .attr("cy", d => scrollViewClassScale(d.unzipped.class_ind))
                                 .attr("r", d =>  rz(d.unzipped) / 8)
                                 .style("opacity", 0.75)
                        }
                    );
                
    let classCircles = d3.selectAll(".class_ind_".concat(d.class_ind.toString()));
    classCircles.remove();

    commitHistoryZipped = commitHistoryZipped.filter(function(e) {
        if (e.class_ind == d.class_ind) {
            commitHistoryRemovedZipped.push(e);
            return false;
        }
        else return true;
    });

    hideZippedTooltip();
}

function unzippedClassCommitDblclick(d,i) {

    inTransition++;
    setTimeout(() => { inTransition--; }, 800);
    commitHistoryUnzipped = commitHistoryUnzipped.filter(function(e) {
        if (d.zipped.class_ind == e.zipped.class_ind) return false;
        else return true;
    })
    let unzippedCommitsMain = mainUnzippedView.selectAll(".unzipped_class_ind_".concat(d.zipped.class_ind.toString()));
    unzippedCommitsMain.transition()
                 .duration(500)
                 .attr("cx", d => x(d.zipped))
                 .attr("cy", d => y(d.zipped))
                 .attr("r", d => r(d.zipped))
    
    let unzippedCommitsScroll = scrollView.selectAll(".unzipped_class_ind_".concat(d.zipped.class_ind.toString())); 
    unzippedCommitsScroll.transition()
                         .duration(500)
                         .attr("cx", d => scrollViewCommitScale(d.zipped.commit_ind) + margin.left)
                         .attr("cy", d => scrollViewClassScale(d.zipped.class_ind))
                         .attr("r", d => r(d.zipped) / 8);
    
    hideUnzippedTooltip();
    setTimeout(() => {        
        let zippedCommits = commitHistoryRemovedZipped.filter(function(e) {
            if(e.class_ind == d.zipped.class_ind) return true;
            else return false;
        });
        commitHistoryZipped = commitHistoryZipped.concat(zippedCommits);
        commitHistoryRemovedZipped = commitHistoryRemovedZipped.filter(function(e) {
            if(e.class_ind == d.zipped.class_ind) return false;
            else return true;
        });

        let targetOpacity;
        if(clickedClassNum == 1) targetOpacity = 0.3;
        else targetOpacity = 0.18; 

        mainCircleView.selectAll(".class_ind_".concat(d.zipped.class_ind.toString()))
                .data(filterZippedComit(zippedCommits), d => d.sha)
                .join(
                    enter => {
                        enter.append("circle")
                             .attr("class", "class_ind_".concat(d.zipped.class_ind.toString()))
                             .attr("cx", d => x(d))
                             .attr("cy", d => y(d))
                             .attr("r", d => r(d))
                             .attr("fill", d => d.color)
                             .style("opacity", 1)
                             .on("mouseover", classCommitHoverOver)
                             .on("mouseout", classCommitHoverOut)
                             .on("click", classCommitClick)
                             .on("mousemove", moveZippedTooltip)
                             .transition()
                             .duration(300)
                             .style("opacity", targetOpacity);
                    }
                );
        unzippedCommitsMain.remove();
        
        scrollCircleView.selectAll(".class_ind_".concat(d.zipped.class_ind.toString()))
                  .data(zippedCommits, d => d.sha)
                  .join(
                        enter => {
                            enter.append("circle")
                                 .attr("class", "class_ind_".concat(d.zipped.class_ind.toString()))
                                 .attr("cx", d => scrollViewCommitScale(d.commit_ind) + margin.left)
                                 .attr("cy", d => scrollViewClassScale(d.class_ind))
                                 .attr("r", d => r(d) / 8)
                                 .attr("fill", d => d.color)
                                 .style("opacity", 1)
                                 .transition()
                                 .duration(300)
                                 .style("opacity", 0.3);
                        }
                  );
        unzippedCommitsScroll.remove();

        if(targetOpacity == 0.3) {
            mainCircleView.selectAll("circle")
                          .transition()
                          .duration(300)
                          .style("opacity", 0.3);
        }
        setTimeout(() => { clickedClassNum--;}, 300)
    }, 500);
}


function filterZippedComit(zippedCommits) {
    let filterRange = [scrollMoverRange[0] - 5, scrollMoverRange[1] + 5]
    let filteredCommitHistory = zippedCommits.filter(function(d) {
        return d.commit_ind > filterRange[0] && d.commit_ind < filterRange[1];
    });
    return filteredCommitHistory;
}

function filterCommitHistoryUnzipped(commitHistoryUnzipped) {
    let filterRange = [scrollMoverRange[0] - 5, scrollMoverRange[1] + 5]
    let filteredCommitHistory = commitHistoryUnzipped.filter(function(d) {
        return d.unzipped.commit_ind > filterRange[0] && d.unzipped.commit_ind < filterRange[1];
    });
    return filteredCommitHistory;
}
