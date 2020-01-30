

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

void printJsonClasses(vector<Class*> classes, string indent) {
    vector<Class*> :: iterator iter;
    for(iter = classes.begin(); iter != classes.end();) {
        (*iter)->printJson(indent);
        iter++;
        if(iter != classes.end())
            cout << ", " << endl;
        else
            cout << endl;
    }
}

void printMethods(vector<Method*> methods, string indent) {
    vector<Method*> :: iterator iter;
    for(iter = methods.begin(); iter != methods.end();) {
        (*iter)->printJson(indent);
        iter++;
        if(iter != methods.end())
            cout << ", " << endl;
        else
            cout << endl;
    }
}

void printCommits(vector<Commit*> commits, string indent) {
    vector<Commit*> :: iterator iter;
    for(iter = commits.begin(); iter != commits.end();) {
        (*iter)->printJson(indent);
        iter++;
        if(iter != commits.end())
            cout << "," << endl;
        else 
            cout << endl;
    }
}