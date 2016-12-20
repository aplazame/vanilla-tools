# --- vanilla-tools

test:
	npm test

publish: test
	cp package.json lib
	cd lib && npm publish
	rm lib/package.json
