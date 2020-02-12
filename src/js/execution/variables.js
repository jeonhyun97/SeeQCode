/* =============== DATA ================ */

// Commit History & Commit Hisoty zipped for visualization
let commitHistory = new Array();
let commitHistoryZipped = new Array();
// Commit History unzipped by the click
let commitHistoryUnzipped = new Array(); 
// 
let commitHistoryRemovedZipped = new Array();

// Total Commit & Class #
let totalCommitNum;
let totalClassNum;

/* =============== VIEW ================ */

// Main & Scroll View SVG selections
let mainView;
let scrollView;

// Size of views
let viewWidth;
let mainViewHeight, scrollViewHeight;

let margin = {
    top : 10,
    bottom : 10,
    left : 20,
    right : 20
};

/* ============== SCALING ============== */

// current Range of scroll view Mover
let scrollMoverRange;

// scale variables
let commitScale;    // x axis
let classScale;     // y axis

// scroll view scale variables;
let scrollViewCommitScale;
let scrollViewClassScale;
/* ============== CIRCLES ============== */

// circle svg container in main & scroll view
let mainCircleView;
let scrollCircleView;
