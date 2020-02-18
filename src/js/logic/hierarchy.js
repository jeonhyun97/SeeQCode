function initHierarchyView(d) {
    mainHierarchyView = mainView.append("g")
                                .attr("id", "mainHierarchyView");
    scrollHierarchyView = scrollView.append("g")
                                    .attr("id", "scrollHierarchyView");
}


function drawHierarchyGraph(d) {
    d.hier_group.forEach(function(e) {
        let type = e.type == "childOf" ? "parentOf" : "childOf";
        let text = "." + type + "_" + d.class_ind;

        if(type == "childOf") {
            d3.selectAll(".class_ind_" + e.index)
              .transition()
              .duration(100)
              .style("opacity", Math.max(1.0 - e.dist * 0.25, 0.18));
        }
        else {
            d3.selectAll(text)
              .transition()
              .duration(100)
              .style("opacity", Math.max(1.0 - e.dist * 0.25, 0.18));
        }
    });

}

function eraseHierarchyGraph(d) {
    d.hier_group.forEach(function(e) {
        let type = e.type == "childOf" ? "parentOf" : "childOf";
        let text = "." + type + "_" + d.class_ind;

        if(type == "childOf") {
            mainCircleView.selectAll(".class_ind_" + e.index)
              .transition()
              .duration(100)
              .style("opacity", 0.3);
            scrollCircleView.selectAll(".class_ind_" + e.index)
              .transition()
              .duration(100)
              .style("opacity", 0.3);
        }
        else {
            mainCircleView.selectAll(text)
              .transition()
              .duration(100)
              .style("opacity", 0.3);
            scrollCircleView.selectAll(".class_ind_" + e.index)
              .transition()
              .duration(100)
              .style("opacity", 0.3);
        }

    })

}


