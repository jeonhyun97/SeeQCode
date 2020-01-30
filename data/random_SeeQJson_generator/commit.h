#ifndef COMMIT_H
#define COMMIT_H

#include <string>
#include <vector>

using namespace std;

class Commit {
private:
    string type;
    string branch;
    string message;
    string author;
    string date; // ex) 201605131307 : 13 / 05 / 2016  1:07 pm
    string sha;

    //score
    float code_smell;
    float metric;
    float documentation;
    float test_coverage;

public:
    Commit(string branch, string message, string author, string date, string sha,
           float code_smell, float metric, float documentation, float test_coverage);
    void printJson(string indent);
};



#endif