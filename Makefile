# --- vanilla-tools

test:
	npm test

npm.version:
	npm version patch -m "Increasing version to %s"

publish: test npm.version
	cp package.json lib
	cd lib && npm publish
	rm lib/package.json
	@git push origin master
	git push --tags
