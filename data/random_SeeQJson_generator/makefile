sample_generator : sample_generator.o class.o method.o commit.o helper.o generate.o
	g++ -o generator sample_generator.o class.o method.o commit.o helper.o generate.o

sample_generator.o : sample_generator.cpp
	g++ -c sample_generator.cpp -o sample_generator.o

class.o : class.cpp class.h
	g++ -c class.cpp -o class.o

method.o : method.cpp method.h
	g++ -c method.cpp -o method.o

commit.o : commit.cpp commit.h
	g++ -c commit.cpp -o commit.o

helper.o : helper.cpp helper.h
	g++ -c helper.cpp

generate.o : generate.cpp generate.h
	g++ -c generate.cpp

clean:
	rm *.o generator
