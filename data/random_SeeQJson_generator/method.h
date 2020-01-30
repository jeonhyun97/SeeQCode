#ifndef METHOD_H
#define METHOD_H

#include <string>
#include "commit.h"

using namespace std;

class Method {
private:
    string type;
    vector<Commit*> commits;

    // Method infos
    string name;
    string modifier;

public:
    Method(string name, string modifier);
    void printJson(string indent);
    string getName();
};


#endif