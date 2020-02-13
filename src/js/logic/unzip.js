
function updateUnzippedMainCircles() {
    mainUnzippedView.selectAll("circle")
                  .data(filterCommitHistoryUnzipped(commitHistoryUnzipped), d => d.unzipped.sha)
                  .join(
                      enter => {
                          enter.append("circle")
                               .attr("class", d => "unzipped_class_ind_".concat(d.zipped.class_ind.toString()))
                               .attr("cx", d => x(d.unzipped))
                               .attr("cy", d => y(d.unzipped))
                               .attr("r", d => rz(d.unzipped))
                               .attr("fill", d => d.zipped.color)
                               .style("opacity", 0.75)
                               .on("mouseover", unzippedClassCommitHoverOver)
                               .on("mouseout", unzippedClassCommitHoverOut)
                               .on("dblclick", unzippedClassCommitDblclick)
                               .on("mousemove", moveUnzippedTooltip)
                      },
                      update => {
                          update.attr("class", d => "unzipped_class_ind_".concat(d.zipped.class_ind.toString()))
                                .attr("cx", d => x(d.unzipped))
                                .attr("cy", d => y(d.unzipped));
                      },
                      exit => { exit.remove(); }
                  );
}


function updateUnzippedScrollCircles() {
    scrollUnzippedView.selectAll("circle")
                      .attr("class", d => "unzipped_class_ind_".concat(d.zipped.class_ind.toString()))
                      .attr("cx", d => scrollViewCommitScale(d.unzipped.commit_ind) + margin.left)
                      .attr("cy", d => scrollViewClassScale(d.unzipped.class_ind))
                      .attr("r", d => rz(d.unzipped) / 8);
    return;
}