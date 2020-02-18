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

   // drawEdges(d);

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
        }
        else {
            mainCircleView.selectAll(text)
              .transition()
              .duration(100)
              .style("opacity", 0.3);
        }

    })

}


function drawEdges(d) {
    let mainEdgeData = new Array();


    mainHierarchyView.selectAll("line")
                       .data(mainEdgeData)
                       .join(
                           enter => {
                               enter.append("line")
                                    .attr("x1", d => d.x1).attr("y1", d => d.y1)
                                    .attr("x2", d => d.x2).attr("y2", d => d.y2)
                                    .attr("stroke", "black")
                                    .attr("stroke-width", 3.0);
                           }
                       );
      // 현재 문제상황 : 라인 필터링 안됨, 커브면 좋겠음, 원 마스킹 되어야함 아오 ㅅㅂ
}

function eraseEdges() {
    mainHierarchyView.selectAll("line").remove();
}
