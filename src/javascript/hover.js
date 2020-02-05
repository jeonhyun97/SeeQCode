function class_commit_hover_over(d, i) {
    let class_commits = d3.selectAll(".class_ind_".concat(d.class_ind.toString()));
    class_commits.style("opacity", 1.0)
                 .raise();
}

function class_commit_hover_out(d, i) {
    let class_commits = d3.selectAll(".class_ind_".concat(d.class_ind.toString()));
    class_commits.style("opacity", 0.4)
}