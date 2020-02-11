function translate(x, y) {
    return "translate(" + x + "," + y +")";
}

// functions for scaling circle attributes
function x(d) { return commitScale(d.commit_ind) + margin.left }
function y(d) { return classScale(d.class_ind) + margin.top }
function r(d) { return (d.score * 7)}