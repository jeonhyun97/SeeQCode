## SeeQCode

### Visualizing the "quality"

**SeeQCode** not only focuses on checking the *amount* of the contribution made by each author but also visualizes the *quality*. It *See*ks the *Q*uality of *Code*.


#### Things to consider
1. Motivation
   - hard to score the contribution
     - various aspects of project
     - different languages
   - *the quality contribution is somewhat "subjective"*
   - visualizing them will be quite effective to understand the overall progress of project and might helpful to manage authors.
2. Visualizing history
   - *CVSscan* (2010)
   - maybe better way to show quality??
   - Tree? Interactive?
   - Circle 
   - Visualize file or whole project? -> maybe project...
3. Measuring quality
   - code metric -> quite intuitive
     - Maintainability index will be a good metric
   - code smell -> various code smell...how can we determine?
     - Which code smell will be considered? 
     - measure redundancy, efficiency...
   - test coverage -> maybe need to find ultimate measure
     - MCDC Coverage
   - documentation -> followed javaDoc? Consistency?
      - *Quality Analysis of Source Code Comments* (2013)
4. Visualizing quality
   - per author
   - individually, or syntagmatically?
   - Maybe answering both will be reasonable
   - assigning different color to each author
5. Data?
   - using github api
   - or using git diff command
   - which is better? github api!!
   - Problem : algorithm
     - Extract method / class info from the code
6. Other else..

### Service through...

web, developed with js / d3 (maybe by github page)

