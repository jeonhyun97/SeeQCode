#include <iostream>
#include <fstream>
#include <string>

#include "class.h"
#include "method.h"
#include "commit.h"
#include "helper.h"
#include "generate.h"

using namespace std;

#define JSONPATH "../sample/random_SeeQ.json"
#define JSPATH "../sample/random_SeeQ.js"


void printSeeQJson(vector<Class*>* stem) {
    cout << "[" << endl;
    printJsonClasses(*stem, "   ");
    cout << "]" << endl;
}



int main() {


    // generating random SeeQJson Structure
    vector<Class*>* stem = new vector<Class*>();
    generateRandomSeeQJson(stem);

    // ready for redirecting output stream...
    ofstream outJson(JSONPATH);
    ofstream outJs(JSPATH);
    streambuf *coutbuf = cout.rdbuf();


    // print SeeQJson file
    cout << "\nPrinting JSON file..." << endl;
    cout.rdbuf(outJson.rdbuf());
    printSeeQJson(stem);

    // print SeeQJson file (JS VER.)
    cout.rdbuf(coutbuf);
    cout << "Printing JS file...\n" << endl;
    cout.rdbuf(outJs.rdbuf());
    cout << "SeeQ_data = " << endl;
    printSeeQJson(stem);

    // restoring output stream
    cout.rdbuf(coutbuf);

    cout << "Program finished successfully!!!" << endl;
    cout << "Check the result by executing cat ../sample/random_SeeQ.json or .js" << endl;

    return 0;
}