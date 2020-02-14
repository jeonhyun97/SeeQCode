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
    })

    drawEdges(d);

}

function drawEdges(d) {
    let edgeData = new Array();
    d3.selectAll(".class_ind_" + d.class_ind).nodes()
      .forEach(function(e, i, nodes) {
          if(i != 0) {
            let x1 = nodes[i - 1].getAttribute("cx"),
                y1 = nodes[i - 1].getAttribute("cy"),
                x2 = nodes[i].getAttribute("cx"),
                y2 = nodes[i].getAttribute("cy");

            edgeData.push({
                x1 : x1, y1 : y1, x2 : x2, y2 : y2
            });
          }
      })

      console.log(edgeData);

      mainHierarchyView.selectAll("line")
                       .data(edgeData)
                       .enter()
                       .append("line")
                       .attr("x1", d => d.x1).attr("y1", d => d.y1)
                       .attr("x2", d => d.x2).attr("y2", d => d.y2)
                       .attr("stroke", "black")
                       .attr("stroke-width", 3.0)

      // 현재 문제상황 : 라인 필터링 안됨, 커브면 좋겠음, 원 마스킹 되어야함 아오 ㅅㅂ
    
    

}

function eraseEdges() {

}

function eraseHierarchyGraph(d) {

}