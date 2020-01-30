#ifndef HELPER_H
#define HELPER_H

#include <string>
#include <vector>

#include "class.h"
#include "method.h"
#include "commit.h"

void printClasses(vector<Class*> classes, string indent);

void printJsonClasses(vector<Class*> classes, string indent);

void printMethods(vector<Method*> methods, string indent);

void printCommits(vector<Commit*> commits, string indent);

#endif
