sample_generator : objects/sample_generator.o objects/class.o objects/method.o objects/commit.o
	g++ -o generator objects/sample_generator.o objects/class.o objects/method.o objects/commit.o

sample_generator.o : sample_generator.cpp
	g++ -c sample_generator.cpp -o objects/sample_generator.o

class.o : class.cpp class.h
	g++ -c class.cpp -o objects/class.o

method.o : method.cpp method.h
	g++ -c method.cpp -o objects/method.o

commit.o : commit.cpp commit.h
	g++ -c commit.cpp -o objects/commit.o

clean:
	rm objects/*.o generator
