#!/bin/bash


platforms=$(cordova platform ls)
for p in android electron browser; do
	if [ ! -f platforms/$p ]; then
		cordova platform add $p
	fi
	cordova build $p
done
