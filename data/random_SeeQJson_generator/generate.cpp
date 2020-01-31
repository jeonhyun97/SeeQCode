
#include "generate.h"

#include <cstdlib>
#include <ctime>
#include <iostream>
#include <cmath>
#include <iomanip>
#include <string>
#include <sstream>

using namespace std;

#define class_percentage(progress) ((log10(progress) + 2) / 2)

int current_branch_index = 0;
int current_author_index = 0;

int current_year = 2020;
int current_month = 1;
int current_day = 1;


int random(int start, int end) { // start <= num <= end
    int possibility = end - start + 1;
    return rand() % possibility + start;
}

int random(int end) {  // 1 <= num <= end
    return random(1, end);
}

// retrun true with probability (percentage / 100), otherwise return false
bool gambling(int percentage) {
    if (percentage > 99) percentage = 99;
    if (random(100) > percentage) return false;
    else return true;
}


void addClasses(vector<Class*>* stem, float progress, Commit* commit) {
    progress = 0.01 > progress ? 0.01: progress;
    int current_percentage = class_percentage(progress) * 100;
    current_percentage = 100 - min(max(current_percentage, 50), 95);
    if(gambling(current_percentage) && stem->size() < 40) {
        if(gambling(15)){
            if(gambling(40)) {}
            
            else {}
        
        }
        else {}
    }

}

void addMethods() {

}

void updateClasses() {

}

void updateMethods() {

}

string getNextDate() {
    string year = to_string(current_year);
    string month = to_string(current_month);
    string day = to_string(current_day);
    if(current_month < 10) month = "0" + month;
    if(current_day < 10) day = "0" + day;
    current_day += random(0, 7);
    if(current_day > 30) {
        current_day -=30;
        current_month += 1;
        if(current_month == 13) {
            current_month = 1;
            current_year++;
        }
    }
    return year + month + day;
}

Commit* addCommit(int branchNum, int authorNum, string* branches, string* authors, int i) {
    
    
    if(!gambling(70)) current_branch_index = gambling(30) ? 0 : random(0, branchNum - 1);
    if(!gambling(70)) current_author_index = random(0, authorNum - 1);
    string branch = branches[current_branch_index];
    string author = authors[current_author_index];
    string date = getNextDate();

    stringstream stream;
    for(int i = 0; i < 6; i++) {
        int current = random(15);
        stream << hex << current;
    }
    string sha = stream.str();
    string message = "(" + date + ") " + "Commit #" + to_string(i) + " ["  + sha + "]" + " done by " + author + " in branch \"" + branch +"\"";

    cout << message << endl;
    return new Commit(branch, message, author, date, sha);
}



void generateCommits(int commitNum, vector<Class*>* stem) {
    
    cout << "Commit : " << commitNum << " times" << endl;

    string branches[6] = {"master", "dev", "working", "feature", "issue", "hotfix"};
    int branchNum = random(2, 6);
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


    // members
    int current_branch = 0; // initial branch : master
    string message, author;
    int date;
    string sha;
    float code_smell, metric, documentation, test_coverage;

    int* classNum;

    for(int i = 0; i < commitNum; i++) {
        float progress = (float)i / (float) commitNum;
        Commit* current_commit = addCommit(branchNum, authorNum, branches, authors, i);
    }
}


void generateRandomSeeQJson(vector<Class*>* stem) {
    srand(time(NULL));

    cout << "==================" << endl;
    generateCommits(random(50, 300), stem);
    cout << "==================" << endl;

    return;
}