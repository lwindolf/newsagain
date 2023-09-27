# NewsAgain

WIP prototype for a backend-less PWA feed reader replacing [Liferea](https://lzone.de/liferea)

Can be used as an

- Electron app
- Android app

While NewsAgain is technically a PWA as a feed reader it cannot be run in
a normal browser as most websites do deliver feeds without permissive CORS
headers causing a PWA to be unable to download them due to security errors.
Electron/Android apps do not have this limitation.

## Dependencies

For compilation you need Cordova installed:

    npm install

to be able to compile the Android app you also need

- Android SDK with runtime v33.0.2 installed
- env var for Android SDK e.g. `export ANDROID_HOME=~/Android/Sdk`
- gradle 4.4.x

## How to compile

    npm test
    npm run build
    npm run build --release

## How to run

Run Electron app

    npm start electron             # Run Electron app
    npm start electron --nobuild   # Run without rebuild (much faster)

Run Android app on mobile in developer mode

    npm start android --device

Run Android app in virtual device in Android Studio

    cordova emulate android

Simple Cordova browser debug environment

    npm start browser