#!/bin/bash

# Install deps
test -d www/assets/js/lib || mkdir www/assets/js/lib
cp node_modules/handlebars/dist/handlebars.min.js www/assets/js/lib

platforms=$(cordova platform ls)
for p in android electron browser; do
	if [ ! -f platforms/$p ]; then
		cordova platform add $p
	fi
	cordova build $p
done
