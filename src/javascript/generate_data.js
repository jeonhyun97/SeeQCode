
// global variables to use

let width = 16000;
let height = 600;
let classes_history = new Array();
let commit_history = new Array();
let authors = new Set();
let colors = ["#0000FF", "#A52A2A", "#006400", "#8B008B", "#696969", "#DAA520", "#ADD8E6"];
let author2Color = new Map()

let commit_history_zipped = new Array();

let totalCommitNum;
let totalClassNum;


// calculate average score
function score (info) {
    return (info.code_smell + info.metric + info.documentation + info.test_coverage) / 4;
}

// generate class commit history
function generate_class_commit_history() {
    for(let i = 0; i < SeeQ_data.length; i++) {
        let current_commits = SeeQ_data[i].commits;
        classes_history.push({ 
            name : SeeQ_data[i].name, 
            commits : current_commits
        });
        for(let j = 0; j < current_commits.length; j++) {
            commit_history.push({
                class_ind : i,
                commit_ind : current_commits[j].num,
                score : score(current_commits[j].score),
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

// generate zipped class commit history ( combine if consecutive )
function generate_zipped_class_commit_history() {
    let current_i = 0;
    let current_author = commit_history[0].info.author;
    let current_stack = new Array();
    
    for(let i = 0; i < commit_history.length; i++) {
        if(current_i == commit_history[i].class_ind &&
           current_author == commit_history[i].info.author) {
            current_stack.push(commit_history[i]);
        }
        else {
            let j_sum = 0;
            let score_sum = 0;
            let cardinality = current_stack.length;
            let shaSum = "";
            while(current_stack.length != 0) {
                element = current_stack.pop();
                j_sum += element.commit_ind;
                score_sum += element.score;
                shaSum += element.sha;
            }
            let j_average = j_sum / cardinality;
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

function getTotalCommitNum() {
    let max = -1;
    for(let i = 0; i < commit_history.length; i++) {
        max = max > commit_history[i].commit_ind ? max : commit_history[i].commit_ind;
    }
    totalCommitNum = max;
}

function getTotalClassNum() {
    let max = -1;
    for(let i = 0; i < commit_history.length; i++) {
        max = max > commit_history[i].class_ind ? max : commit_history[i].class_ind;
    }
    totalClassNum = max;

}

function generate_class_commit_histories() {
    generate_class_commit_history();
    generate_zipped_class_commit_history();
}

