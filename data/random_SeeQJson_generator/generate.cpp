
#include "generate.h"
#include "commit.h"
#include "class.h"

#include <cstdlib>
#include <ctime>
#include <iostream>
#include <cmath>
#include <iomanip>
#include <string>
#include <sstream>
#include <set>
#include <vector>

using namespace std;

#define class_percentage(progress) ((log10(progress) + 2) / 2)

int current_branch_index = 0;
int current_author_index = 0;

int current_year = 2020;
int current_month = 1;
int current_day = 1;


int methodNum = 0; 

vector<Method*> methodSet;


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

Commit* createCommitInstance(Commit* commit) {
    Commit* commit_instance = new Commit(*commit);
    float code_smell = (float)random(100, 1000) / 100;
    float metric = (float)random(100, 1000) / 100;
    float documentation = (float)random(100, 1000) / 100;
    float test_coverage = (float)random(100, 1000) / 100;
    commit_instance->setScore(code_smell, metric, documentation, test_coverage);
    return commit_instance;
}


void addMethods(Class* target, Commit* commit) {
    int new_method_num = random(3);
    if(gambling(80)) new_method_num = 1;
    if(gambling(60)) new_method_num = 0;

    for(int i = 0; i < new_method_num; i++) {
        Commit* commit_instance = createCommitInstance(commit);
        Method* new_method = new Method("test", "protected");
        new_method->addCommit(commit_instance);
        target->addMethod(new_method);
        methodSet.push_back(new_method);
    }
    methodNum += new_method_num;
}



void updateMethods(Commit* commit) {
    if (methodSet.size() == 0) return;
    int method_num = methodSet.size();
    set<int> update_methods_index;
    int update_num = random(5);


    for(int i = 0; i < update_num; i++) {
        update_methods_index.insert(random(0, methodSet.size() - 1));
    }

    set<int> :: iterator iter;
    for(iter = update_methods_index.begin(); iter != update_methods_index.end(); iter++) {
        Commit* commit_instance = createCommitInstance(commit);
        methodSet[*iter]->addCommit(commit_instance);
    }
}



void addClass(vector<Class*>* stem, Commit* commit) {
    Commit* commit_instance = createCommitInstance(commit);
    string name = "test_class_" + to_string(stem->size() + 1);
    
    string modifier;
    if(gambling(50)) modifier = "NONE";
    else if(gambling(33)) modifier = "abstract";
    else if(gambling(50)) modifier = "interface";
    else modifier = "final";


    Class* parent;
    if (gambling(80) || stem->size() == 0) parent = NULL;
    else parent = (*stem)[random(0, stem->size() - 1)];
    Class* new_class = new Class(name, modifier, parent);
    new_class->addCommit(commit_instance);
    if(parent == NULL && stem->size() > 0) {
        if(gambling(10)) {
            (*stem)[random(0, stem->size() - 1)]->addSubClass(new_class);
            return;
        }
    }
    addMethods(new_class, commit);
    stem->push_back(new_class);
}




void addClasses(vector<Class*>* stem, float progress, Commit* commit) {
    progress = 0.01 > progress ? 0.01: progress;
    int current_percentage = class_percentage(progress) * 100;
    current_percentage = 100 - min(max(current_percentage, 50), 95);
    if(gambling(current_percentage) && stem->size() < 25) {
        if(gambling(15)){
            if(gambling(40)) {
                addClass(stem, commit);
                addClass(stem, commit);
                addClass(stem, commit);
            }
            else {
                addClass(stem, commit);
                addClass(stem, commit);
            }
        }
        else addClass(stem, commit);
    }
}



void updateClasses(vector<Class*>* stem, Commit* commit) {
    if(stem->size() == 0) return;
    int update_class_num = random(4);

    set<int> update_class_set;
    for(int i = 0; i < update_class_num; i++) { update_class_set.insert(random(0, stem->size() -1)); }

    set<int> :: iterator iter;
    for(iter = update_class_set.begin(); iter != update_class_set.end() ; iter++) {
        Class* target = (*stem)[*iter];
        if(target->getSubClassNum() > 0) {
            if(gambling(50)) {
                target = target->getSubClass(random(target->getSubClassNum()) - 1);
            }
        }
        Commit* commit_instance = createCommitInstance(commit);
        target->addCommit(commit_instance);
        addMethods(target, commit);
    }
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

Commit* newCommit(int branchNum, int authorNum, string* branches, string* authors, int i) {
    
    
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
    string message = "(" + date + ") " + "Commit #" + to_string(i) + " ["  + sha + "]" + " done by " + author + " in branch @" + branch;

    return new Commit(branch, message, author, date, i, sha);
}



void generateCommits(int commitNum, vector<Class*>* stem) {
    
    cout << "Commit : " << commitNum << " times" << endl;

    string branches[6] = {"master", "dev", "working", "feature", "issue", "hotfix"};
    int branchNum = random(2, 6);

    string authors[7] = {"Alice", "Bob", "Carol", "Dave", "Eve", "Frank", "Grace"};
    int authorNum = random(7);


    // members
    int current_branch = 0; // initial branch : master
    string message, author;
    int date;
    string sha;
    float code_smell, metric, documentation, test_coverage;

    int* classNum;

    for(int i = 0; i < commitNum; i++) {
        float progress = (float)i / (float) commitNum;
        Commit* current_commit = newCommit(branchNum, authorNum, branches, authors, i);
        updateMethods(current_commit);
        updateClasses(stem, current_commit);
        addClasses(stem, progress, current_commit);
    }

    cout << "Class  : " << stem->size() << " classes" << endl;
    cout << "Method : " << methodNum << " methods" << endl;
    cout << "Branch : " << branchNum << " [ "; 
    for(int i = 0; i < branchNum; i++) {
        cout << branches[i] << " ";
    }
    cout << "]" << endl;
    cout << "Author : " << authorNum << " [ ";
    for(int i = 0; i < authorNum; i++) {
        cout << authors[i] << " ";
    }
    cout << "]" << endl;
}


void generateRandomSeeQJson(vector<Class*>* stem) {
    srand(time(NULL));

    cout << "=============================" << endl;
    generateCommits(random(50, 300), stem);
    cout << "=============================" << endl;
    cout << "SUCCESSFUL GENERATION..." << endl;

    return;
}