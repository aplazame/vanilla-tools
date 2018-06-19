# --- vanilla-tools

lint:
	$(shell npm bin)/eslint lib

test: lint
	$(shell npm bin)/mocha tests

bundle:
	mkdir -p .tmp && $(shell npm bin)/browserify lib/bundle.js -o .tmp/bundle.js

npm.version:
	npm version patch -m "Increasing version to %s"

publish: test bundle npm.version
	cp package.json lib
	cd lib && npm publish
	rm lib/package.json
	@git push origin master
	git push --tags
