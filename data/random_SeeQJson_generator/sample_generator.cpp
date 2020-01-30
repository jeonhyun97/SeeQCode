#include <iostream>

#include "class.h"
#include "method.h"
#include "commit.h"

using namespace std;

int main() {

    Class* parent_class = new Class("parent", "abstract", NULL);

    Class* child_class = new Class("child", "final", parent_class);

    Method* method_1 = new Method("method1", "public");
    Method* method_2 = new Method("method2", "private");
    child_class->addMethod(method_1);
    child_class->addMethod(method_2);
    
    
    parent_class->printJson("");
    cout << "," << endl;
    child_class->printJson("");

    cout << endl;

    return 0;
}