#include "commit.h"

Commit :: Commit(string branch, string message, string author, string date, string sha,
           float code_smell, float metric, float documentation, float test_coverage) {

}
void Commit :: printJson(string indent){

}
   
string Commit :: getSha() {
    return sha;
}