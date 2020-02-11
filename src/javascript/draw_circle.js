
function x(d) { return commitScale(d.commit_ind) + margin.left }
function y(d) { return classScale(d.class_ind) + margin.top }
function r(d) { return (d.score * 7)}


// variables for drawing circles which denote contribution

let mainCircleView;
let scrollCircleView;

function initMainViewCircles() {
    mainCircleView = mainView.append("g")
                             .attr("id", "mainCircleView");

    mainCircleView.selectAll("circle")
                  .data(commit_history_zipped)
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
    mainCircleView.selectAll("circle")
                  .attr("cx", d => x(d))
                  .attr("cy", d => y(d))

}

function initScrollViewCircles() {

}
































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

// overview visualization

function overview() {
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


