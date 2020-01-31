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
    Commit(string branch, string message, string author, string date, string sha);
    Commit(Commit& ref);
    void printJson(string indent);
    void setScore(float code_smell, float metric, float documentation, float test_coverage);

    string getType() { return type; }
    string getBranch() { return branch; }
    string getMessage() { return message; }
    string getAuthor() { return author; }
    string getDate() { return date; }
    string getSha() { return sha; }

};



#endif