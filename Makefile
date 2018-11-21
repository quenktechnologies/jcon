# Copy all the sources to the lib folder then run tsc.
lib: $(shell find src -type f -name \*.ts) src/parser.js
	rm -R lib/**/*.ts 2> /dev/null || true 
	mkdir -p lib
	cp -R -u src/* lib
	./node_modules/.bin/tsc --project lib

src/parser.js: src/jcon.y
	./node_modules/.bin/jison -o $@ src/jcon.y 
