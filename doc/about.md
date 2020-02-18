
##### Purpose

SeeQCode

##### Architecture

<img src="../doc/img/diagram.png" width="800">


The overall program structure is like this:

1) Collects the repository info using Github API, and parses it.
   
2) By using the data from *step 1*, constructs the .json file following SeeQJson format.
   
3) Generates the web view derived from the result of *step 2*.
   
SeeQCode only accepts Java for the time being.  We selected Java as it has a robust class hierarchy design, and therefore easy to process data.  Also, various tools to analyze code had developed.  For example, we decided to use jacoco to measure test coverage. 