

#include <iostream>

#include "helper.h"

void printClasses(vector<Class*> classes, string indent) {
    vector<Class*> :: iterator iter;
    for(iter = classes.begin(); iter != classes.end();) {
        cout << (*iter)->getName();
        iter++;
        if(iter != classes.end())
            cout << ", ";
    }
}


void printMethods(vector<Method*> methods, string indent) {
    vector<Method*> :: iterator iter;
    for(iter = methods.begin(); iter != methods.end();) {
        cout << (*iter)->getName();
        iter++;
        if(iter != methods.end())
            cout << ", " << endl;
    }
}

void printCommits(vector<Commit*> commits, string indent) {
    vector<Commit*> :: iterator iter;
    for(iter = commits.begin(); iter != commits.end();) {
        cout << (*iter)->getSha();
        iter++;
        if(iter != commits.end())
            cout << "," << endl;
    }
}