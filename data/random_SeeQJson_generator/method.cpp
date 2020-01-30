#include "method.h"
#include "helper.h"

#include <iostream>

using namespace std;

Method :: Method(string name, string modifier) {
    this->type = "\"method\"";
    this->name = "\"" + name + "\"";
    this->modifier = "\"" + modifier + "\"";
}

void Method :: printJson(string indent) {
    string tab = indent;
    string next_tab = indent + "   ";
    
    cout << tab << "{" << endl;

    cout << tab << "   \"type\" : " << type << "," << endl;

    cout << tab << "   \"name\" : " << name << "," << endl;

    cout << tab << "   \"modifier\" : " << modifier << "," << endl;

    cout << tab << "   \"commits\" : [" << endl;
    printCommits(commits, next_tab + "   ");
    cout << tab << "   ]" << endl;

    cout << indent << "}";
}

void Method :: addCommit(Commit* commit) { commits.push_back(commit); }