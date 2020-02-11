
// global variables to use
let commit_history = new Array();
let authors = new Set();
let colors = ["#0000FF", "#A52A2A", "#006400", "#8B008B", "#696969", "#DAA520", "#ADD8E6"];
let author2Color = new Map()

let commit_history_zipped = new Array();

// Total Commit & Class #
let totalCommitNum;
let totalClassNum;

// calculate average score, this will be changed...
function mockScore (info) {
    return (info.code_smell + info.metric + info.documentation + info.test_coverage) / 4;
}

// Generate class commit history
function generateClassCommitHistory() {
    for(let i = 0; i < SeeQ_data.length; i++) {
        let current_commits = SeeQ_data[i].commits;
        for(let j = 0; j < current_commits.length; j++) {
            commit_history.push({
                class_ind : i,
                commit_ind : current_commits[j].num,
                score : mockScore(current_commits[j].score),
                info : current_commits[j]
            });
            authors.add(current_commits[j].author);
        }
    }
    let i = 0;
    authors.forEach(e => {
        author2Color.set(e, colors[i]);
        i++;
    })
}

// Generate zipped class commit history ( combine if consecutive )
function generateZippedClassCommitHistory() {

    let current_i = 0,
        current_author = commit_history[0].info.author,
        current_stack = new Array();
    
    for(let i = 0; i < commit_history.length; i++) {
        if(current_i == commit_history[i].class_ind &&
           current_author == commit_history[i].info.author) {
            current_stack.push(commit_history[i]);
        }
        else {
            let j_sum     = 0,
                score_sum = 0,
                shaSum    = "",
                cardinal  = current_stack.length;
            while(current_stack.length != 0) {
                element = current_stack.pop();
                j_sum += element.commit_ind;
                score_sum += element.score;
                shaSum += element.sha;
            }
            let j_average = j_sum / cardinal;
            let score_average = Math.sqrt(score_sum);
            commit_history_zipped.push({
                class_ind : current_i,
                commit_ind : j_average,
                score : score_average,
                sha : shaSum,
                color : author2Color.get(current_author)
            });
            current_i = commit_history[i].class_ind;
            current_author = commit_history[i].info.author;
            current_stack.push(commit_history[i]);
        }
    }
}


/* ====================================== */
/* ========== PUBLIC FUNCTIONS ========== */
/* ====================================== */

function generateClassCommitHistories() {
    generateClassCommitHistory();
    generateZippedClassCommitHistory();
}

function calculateBasicInfos() {
    let commitMax = -1, classMax = -1;
    for(let i = 0; i < commit_history.length; i++) {
        commitMax = commitMax > commit_history[i].commit_ind ? commitMax : commit_history[i].commit_ind;
        classMax  = classMax  > commit_history[i].class_ind  ? classMax  : commit_history[i].class_ind;
    }
    totalCommitNum = commitMax;
    totalClassNum = classMax;
}

/* ============================================= */
/* ========== END OF PUBLIC FUNCTIONS ========== */
/* ============================================= */
