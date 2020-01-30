#include <iostream>

#include "class.h"
#include "method.h"
#include "commit.h"

using namespace std;

int main() {

    Class* parent_class = new Class("parent", "abstract", NULL);

    Class* child_class = new Class("child", "final", parent_class);

    parent_class->printJson("");
    child_class->printJson("");

    cout << endl;

    return 0;
}