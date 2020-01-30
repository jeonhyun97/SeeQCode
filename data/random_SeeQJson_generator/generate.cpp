
#include "generate.h"

#include <cstdlib>
#include <ctime>
#include <iostream>

using namespace std;

int random(int start, int end) { // start <= num <= end
    int possibility = end - start + 1;
    return rand() % possibility + start;
}

int random(int end) {  // 1 <= num <= end
    return random(1, end);
}

// 확률(퍼센트)를 넣으면 그 확률로 true가 나오고 나머지는 false 나오는 함수 구현해야함

void generateCommits(int commitNum) {
    
    cout << "Commit : " << commitNum << " times" << endl;

    string branches[6] = {"master", "dev", "working", "feature", "issue", "hotfix"};
    int branchNum = random(6);
    cout << "Branch : " << branchNum << " [ "; 
    for(int i = 0; i < branchNum; i++) {
        cout << branches[i] << " ";
    }
    cout << "]" << endl;

    string authors[7] = {"Alice", "Bob", "Carol", "Dave", "Eve", "Frank", "Grace"};
    int authorNum = random(7);
    cout << "Author : " << authorNum << " [ ";
    for(int i = 0; i < authorNum; i++) {
        cout << authors[i] << " ";
    }
    cout << "]" << endl;

    // memebers
    int current_branch = 0; // initial branch : master
    string message, author;
    int date;
    string sha;
    float code_smell, metric, documentation, test_coverage;


    for(int i = 0; i < commitNum; i++) {


    }
}

void singleCommit() {


}

void generateRandomSeeQJson(vector<Class*>* stem) {
    cout << "==================" << endl;
    srand(time(NULL));
    
    int commitNum = random(50, 300);

    generateCommits(random(50, 300));
    
    
    cout << "==================" << endl;
    
    return;
}