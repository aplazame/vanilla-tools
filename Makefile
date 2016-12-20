# --- vanilla-tools

test:
	npm test

publish: test
	cp package.json lib
	cd lib && npm version patch -m "Increasing version to %s" && npm publish
	rm lib/package.json
