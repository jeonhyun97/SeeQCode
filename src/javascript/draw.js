

// drawing main visualization of the program
function draw_main() {
    let test_svg = d3.selectAll("#main")
    .append("svg")
    .attr("id", "main_svg")
    .attr("width", width)
    .attr("height", height);

    test_svg.selectAll("circle")
            .data(commit_history_zipped)
            .join(
                enter => {
                enter.append("circle")
                     .attr("class", d => "class_ind_".concat(d.class_ind.toString()))
                     .attr("cx", d => (d.commit_ind + 1) * 6)
                     .attr("cy", d => (d.class_ind + 1) * 17 + 30)
                     .attr("r", d => d.score * 6)
                     .style("opacity", 0.4)
                     .attr("fill", d => d.color)
                     .on("mouseover", class_commit_hover_over)
                     .on("mouseout", class_commit_hover_out);
                }
            );

}

generate_class_commit_histories();
draw_main();

// temp drawing to test visualization
function temp() {
    let test_svg = d3.selectAll("#main")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

    test_svg.selectAll("circle")
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

        test_svg.selectAll("#circle2")
                .data(commit_history_zipped)
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
                );
}

temp();