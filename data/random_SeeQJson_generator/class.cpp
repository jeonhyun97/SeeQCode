#include "class.h"
#include "helper.h"
#include <iostream>

using namespace std;



Class :: Class(string name, string modifier, Class* parent) {
    this->type = "\"class\"";
    this->name = "\"" + name + "\"";
    this->modifier = "\"" + modifier + "\"";
    this->parent = parent;
    if (parent != NULL)
        parent->addChild(this);
}

void Class :: printJson(string indent) {

    string tab = indent;
    string next_tab = indent +  "   ";

    // print start
    cout << tab << "{" << endl;

    cout << tab << "   \"type\" : " << type << "," << endl;

    cout << tab << "   \"subclasses\" : [" << endl;
    printJsonClasses(subclasses, next_tab + "   ");
    cout << tab << "   ]," << endl; 

    cout << tab << "   \"methods\" : [" << endl;
    printMethods(methods, next_tab + "   ");
    cout << tab << "   ]," << endl; 

    cout << tab << "   \"commits\" : [" << endl;;
    printCommits(commits, next_tab + "   ");
    cout << tab << "   ]," << endl; 

    cout << tab << "   \"name\" : " << name << "," << endl;

    cout << tab << "   \"modifier\" : " << modifier << "," << endl;

    cout << tab << "   \"parent\" : ";
    if(parent != NULL)
        cout << parent->getName();
    else
        cout << "\"NULL\"";
    cout << "," << endl;

    cout << tab << "   \"children\" : [ ";
    printClasses(children, tab);
    cout << " ]" << endl; 

    cout << tab << "}";

}

void Class :: addChild(Class* child) { children.push_back(child); }
void Class :: addSubClass(Class* subclass) { subclasses.push_back(subclass); }
void Class :: addMethod(Method* method) { methods.push_back(method); }
void Class :: addCommit(Commit* commit) { commits.push_back(commit); }
