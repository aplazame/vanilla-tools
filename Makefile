# --- vanilla-tools

test:
	npm test

publish: test
	npm version patch -m "Increasing version to %s"
	cp package.json lib
	cd lib && npm publish
	rm lib/package.json
