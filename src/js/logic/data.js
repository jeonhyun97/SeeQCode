
/* =================== PUBLIC FUNCTIONS ================== */
/* ======================================================= */

function initData() {
    let author2Color = new Map()
    initCommitHistory(author2Color);
    initZippedCommitHistory(author2Color);
    initClassCommitHierarchy();
    calculateTotalClassCommitNum();
}

/* ======================================================= */
/* =============== END OF PUBLIC FUNCTIONS =============== */


/* =================== HELPER FUNCTIONS ================== */
/* ======================================================= */

// calculate average score. this will be changed...
function mockScore (info) { return (info.code_smell + info.metric + info.documentation + info.test_coverage) / 4; }

// Generate class commit history
function initCommitHistory(author2Color) {
    let authors = new Set();
    let colors  = ["#0000FF", "#A52A2A", "#006400", "#8B008B", "#696969", "#DAA520", "#ADD8E6"];

    let i = 0;
    for( ; i < SeeQ_data.length; i++) {
        let current_commits = SeeQ_data[i].commits;
        for (let j = 0; j < current_commits.length; j++) {
            commitHistory.push({
                class_ind  : i,
                class_name : SeeQ_data[i].name,
                class_mod  : SeeQ_data[i].modifier,
                commit_ind : current_commits[j].num,
                score      : mockScore(current_commits[j].score),
                info       : current_commits[j],
                sha        : current_commits[j].sha,
                color      : "undefined"
            });
            authors.add(current_commits[j].author);
        }
    }
    i = 0; authors.forEach(e => author2Color.set(e, colors[i++]));
    commitHistory.forEach(e => {
        e.color = author2Color.get(e.info.author);
    })
}

// Generate zipped class commit history ( combine if consecutive )
function initZippedCommitHistory(author2Color) {

    let current_i = 0,
        current_author = commitHistory[0].info.author,
        current_stack = new Array();
    
    for(let i = 0; i < commitHistory.length; i++) {
        if(current_i == commitHistory[i].class_ind && current_author == commitHistory[i].info.author) {
            current_stack.push(commitHistory[i]);
        }
        else {
            let j_sum     = 0,
                score_sum = 0,
                shaSum    = "",
                origins   = new Array();
                cardinal  = current_stack.length;
            while(current_stack.length != 0) {
                element    = current_stack.pop();
                j_sum     += element.commit_ind;
                score_sum += element.score;
                shaSum    += element.sha;
                origins.push(element);
            }
            let j_average     = j_sum / cardinal;
            let score_average = Math.sqrt(score_sum);
            commitHistoryZipped.push({
                class_ind  : current_i,
                class_name : origins[0].class_name,
                class_mod  : origins[0].class_mod,
                commit_ind : j_average,
                score      : score_average,
                sha        : shaSum,
                color      : author2Color.get(current_author),
                author     : current_author,
                origins    : origins,
                hier_group : new Array()   
                // if "3" is the child class of "1" and "2", then heir_group = [1, 2];
            });
            current_i      = commitHistory[i].class_ind;
            current_author = commitHistory[i].info.author;
            current_stack.push(commitHistory[i]);
        }
    }
}




function initClassCommitHierarchy() {
    SeeQ_data.forEach(function (e, i){
        registerChildren(e, i);
        registerParent(e, i);
    });
}


function registerChildren(e, parentIndex) {
    e.children.forEach(function (d) {
        let childCommits = commitHistoryZipped.filter(function(c) {
            if (d == c.class_name) return true;
            else return false;
        });
        childCommits.forEach(function(c) {
            c.hier_group.push({
                type  : "childOf",
                index : parentIndex
            });
        });
        let childData = SeeQ_data.find(function(c) {
            if (d == c.name) return true;
            else return false;
        });
        if(childData != undefined)
            registerChildren(childData, parentIndex);
    })
}

function registerParent(e, childIndex) {
    if(e.parent == "NULL") return;
    else {
        let myFirstCommit = commitHistoryZipped.filter(function(d) {
            if (e.name == d.class_name) return true;
            else return false;
        })[0];
        let myFirstCommitIndex = myFirstCommit.commit_ind;
        let parentCommits = commitHistoryZipped.filter(function(d) {
            if (e.parent == d.class_name && d.commit_ind < myFirstCommitIndex) return true;
            else return;
        });
        let parentLastCommit = parentCommits[parentCommits.length - 1];
        parentLastCommit.hier_group.push({
            type : "parentOf",
            index : childIndex
        });
        let parentData = SeeQ_data.find(function(d) {
            if (e.parent == d.name) return true;
            else return false;
        })
        if(parentData != undefined)
            registerParent(parentData, childIndex);
    }
}

function calculateTotalClassCommitNum() {
    let commitMax = -1, 
        classMax  = -1;

    for(let i = 0; i < commitHistory.length; i++) {
        commitMax = commitMax > commitHistory[i].commit_ind ? commitMax : commitHistory[i].commit_ind;
        classMax  = classMax  > commitHistory[i].class_ind  ? classMax  : commitHistory[i].class_ind;
    }
    totalCommitNum = commitMax;
    totalClassNum  = classMax;
}

/* ======================================================= */
/* =============== END OF HELPER FUNCTIONS =============== */

