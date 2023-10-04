#!/bin/bash

set -euo pipefail

MODE="${1-}"

# Install deps
test -d www/assets/js/lib || mkdir www/assets/js/lib
cp node_modules/handlebars/dist/handlebars.min.js www/assets/js/lib
cp node_modules/split.js/dist/split.es.js www/assets/js/lib

platforms=$(cordova platform ls)
for p in android electron browser; do
	if [ ! -f platforms/$p ]; then
		cordova platform add $p || true
	fi
done

SIGN_OPTIONS=
if [ "$MODE" = "--release" ]; then
	# Ensure to provide the secrets from your environment
	SIGN_OPTIONS="--keystore=$APK_SIGN_KEYSTORE --storePassword=$APK_SIGN_KEYSTORE_PASSWORD --alias=$APK_SIGN_USER --password=$APK_SIGN_PASSWORD"
fi

cordova build android $MODE -- $SIGN_OPTIONS --packageType=apk
cordova build electron $MODE