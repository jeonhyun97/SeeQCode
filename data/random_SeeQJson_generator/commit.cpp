#include "commit.h"

#include <iostream>

using namespace std;

Commit :: Commit(string branch, string message, string author, string date, int commitNum, string sha){
    this->type = "\"commit\"";
    this->branch = "\"" + branch + "\"" ;
    this->message = "\"" + message + "\"";
    this->author = "\"" + author + "\"";
    this->date = "\"" + date + "\"";
    this->commitNum = to_string(commitNum);
    this->sha = "\"" + sha + "\"";


}

Commit :: Commit(Commit& ref) {
    this->type = "\"commit\"";
    this->branch = ref.getBranch();
    this->message = ref.getMessage();
    this->author = ref.getAuthor();
    this->date = ref.getDate();
    this->commitNum = ref.getCommitNum();
    this->sha = ref.getSha();
}
void Commit :: printJson(string indent){
    string tab = indent;
    string next_tab = indent + "   ";

    cout << tab << "{" << endl;

    cout << tab << "   \"type\" : " << type << "," << endl;
    cout << tab << "   \"branch\" : " << branch << "," << endl;
    cout << tab << "   \"message\" : " << message << "," << endl;
    cout << tab << "   \"author\" : " << author << "," << endl;
    cout << tab << "   \"date\" : " << date << "," << endl;
    cout << tab << "   \"num\" : " << commitNum << "," << endl;
    cout << tab << "   \"sha\" : " << sha << "," << endl;

    cout << tab << "   \"score\" : {" << endl;
    cout << next_tab << "   \"code_smell\" : " << code_smell << "," << endl;
    cout << next_tab << "   \"metric\" : " << metric << "," << endl;
    cout << next_tab << "   \"documentation\" : " << documentation << "," << endl;
    cout << next_tab << "   \"test_coverage\" : " << test_coverage << endl;

    cout << tab << "   }" << endl;
    
    cout << tab << "}";
}

void Commit :: setScore(float code_smell, float metric, float documentation, float test_coverage) {
    this->code_smell = code_smell;
    this->metric = metric;
    this->documentation = documentation;
    this->test_coverage = test_coverage;
}
   