#ifndef CLASS_H
#define CLASS_H

#include <string>
#include <vector>

#include "method.h"
#include "commit.h"

using namespace std;

class Class {
private:
    string type;
    vector<Class*>  subclasses;
    vector<Method*> methods;
    vector<Commit*> commits;

    // Class infos
    string name;
    string modifier;
    Class* parent;
    vector<Class*> children;

public:
    Class(string name, string modifier, Class* parent);
    void printJson(string indent);
    
    void addChild(Class* child); // contained in constructor, no need to call
    void addSubClass(Class* subclass);
    void addMethod(Method* method);
    void addCommit(Commit* commit);

    string getName() { return name; }
    int getSubClassNum() { return subclasses.size(); }
    Class* getSubClass(int index) { return subclasses[index]; }



};






#endif