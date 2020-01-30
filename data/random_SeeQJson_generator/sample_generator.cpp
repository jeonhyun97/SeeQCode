#include <iostream>
#include <fstream>
#include <string>

#include "class.h"
#include "method.h"
#include "commit.h"

using namespace std;

int main() {

    // redirecting output stream...
    ofstream out("../sample/random_SeeQ.json");
    streambuf *coutbuf = cout.rdbuf();
    cout.rdbuf(out.rdbuf());
    
    cout << "[" << endl;

    Class* parent_class = new Class("parent", "abstract", NULL);
    Class* child_class = new Class("child", "final", parent_class);

    Method* method_1 = new Method("method1", "public");
    Method* method_2 = new Method("method2", "private");
    child_class->addMethod(method_1);
    child_class->addMethod(method_2);

    Commit* commit_1 = new Commit("master", "Initial Commit", "jeonhyun97", "20200101", "111111", 10, 9, 4, 3);
    Commit* commit_2 = new Commit("master", "ADD README", "jeon2", "20200103", "222222", 11, 9, 4, 3);
    parent_class->addCommit(commit_1);
    method_1->addCommit(commit_1);
    method_1->addCommit(commit_2);

    Class* subclass_1 = new Class("subclass 1", "NONE", NULL);
    Class* subclass_2 = new Class("subclass 2", "NONE", NULL);
    parent_class->addSubClass(subclass_1);
    parent_class->addSubClass(subclass_2);

    parent_class->printJson("   ");
    cout << "," << endl;
    child_class->printJson("   ");

    cout << endl;

    cout << "]" << endl;

    // restoring output stream
    cout.rdbuf(coutbuf);

    return 0;
}