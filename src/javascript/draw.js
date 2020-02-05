
function x(d) { return (d.commit_ind + 1) * 13; }
function y(d) { return (d.class_ind + 1) * 15 + 30}
function r(d) { return (d.score * 7)}

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
                     .attr("cx", d => x(d))
                     .attr("cy", d => y(d))
                     .attr("r", d => r(d))
                     .style("opacity", 0.35)
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

    let ratio = 0.3;

        test_svg.selectAll("#circle2")
                .data(commit_history_zipped)
                .join(
                    enter => {
                        enter.append("circle")
                             .attr("id", "circle2")
                             .attr("cx", d => x(d)* ratio)
                             .attr("cy", d => y(d) * ratio)
                             .attr("r", d => r(d) * ratio)
                             .style("opacity", 0.35)
                             .attr("fill", d => d.color)
                    }
                );
}

temp();