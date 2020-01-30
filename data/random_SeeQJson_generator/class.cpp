#include "class.h"
#include "helper.h"
#include <iostream>

using namespace std;



Class :: Class(string name, string modifier, Class* parent) {
    this->type = "class";
    this->name = name;
    this->modifier = modifier;
    this->parent = parent;
    if (parent != NULL)
        parent->addChild(this);
}

void Class :: printJson(string indent) {

    string tab = indent;
    string next_tab = indent +  "   ";



    cout << "{" << endl;

    cout << tab << "   \"type\" : " << type << "," << endl;

    cout << tab << "   \"subclasses\" : [ " ;
    printClasses(subclasses, next_tab);
    cout << tab << " ]," << endl; 

    cout << tab << "   \"methods\" : [ ";
    printMethods(methods, next_tab);
    cout << tab << " ]," << endl; 

    cout << tab << "   \"commits\" : [ ";
    printCommits(commits, next_tab);
    cout << tab << " ]," << endl; 

    cout << tab << "   \"infos\" : {" << endl;
    cout << next_tab << "   \"name\" : " << name << "," << endl;
    cout << next_tab << "   \"modifier\" : " << modifier << "," << endl;
    cout << next_tab << "   \"parent\" : ";
    if(parent != NULL)
        cout << parent->getName();
    else
        cout << "\"NULL\"";
    cout << "," << endl;
    cout << next_tab << "   \"children\" : [ ";
    printClasses(children, next_tab + "   ");
    cout << " ]" << endl; 
    cout << tab << "   }" << endl;


    
    cout << tab << "}";

}

void Class :: addChild(Class* child) {
    children.push_back(child);
}

string Class :: getName() {
    return name;
}