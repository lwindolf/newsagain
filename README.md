[![CI](https://github.com/lwindolf/newsagain/actions/workflows/test.yml/badge.svg)](https://github.com/lwindolf/newsagain/actions/workflows/test.yml)

# NewsAgain

WIP prototype for a backend-less PWA feed reader replacing [Liferea](https://lzone.de/liferea)

Can be used as an

- Electron app
- Android app

While NewsAgain is technically a PWA as a feed reader it cannot be run in
a normal browser as most websites do deliver feeds without permissive CORS
headers causing a PWA to be unable to download them due to security errors.
Electron/Android apps do not have this limitation.

## Compile

    npm install
    npm test
    npm run build
    npm run build --release

Note that aside from all the NPM dependencies if you want to compile for Android you need:

- Android SDK with runtime v33.0.2 installed
- env variable set for Android SDK e.g. `export ANDROID_HOME=~/Android/Sdk`
- gradle 4.4.x

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

## Feature-Completeness

As NewsAgain will be a successor to Liferea it needs to roughly match the most important
features and provide a desktop migration path. Here is the status of the features. Note that
a 🛑 means the feature won't be ported.

### Parsing 

- [x] Atom 1.0 / RSS 1.0, 1.1 and 2.0
- [ ] RSS Namespace support
- [x] Favicon discovery
- 🛑 RSS 0.9x support
- 🛑 Atom 0.3 support

### Web Scraping

- [ ] HTML5 extraction
- [ ] AMP extraction
- 🛑 Local script support

### Network

- [ ] TTL Support
- [ ] Etags/last-modified
- [ ] RSS Syn Namespace
- [ ] User defined update intervals
- [ ] HTTP 429
- [ ] HTTP 410
- [ ] Basic Auth
- [ ] Secret Management
- 🛑 Proxy Support

### Online Source Support

- [ ] Google Reader API (Miniflux, FreshRSS, ...) 
- [ ] TinyTinyRSS
- [ ] InoReader
- [ ] TheOldReader
- [ ] Reedah
- [ ] OPM Import
- 🛑 local OPML sources

### UI Navigation

- [x] Feed list
- [ ] Hierarchic feed list folders
- [ ] Search folders
- [x] Item list
- [x] Item view
- [x] Desktop mouse selection
- [x] Middle click behaviour
- [ ] Launching external browser
- [ ] Launching internal browser
- [ ] Drag&Drop
- [ ] XDG Integration (URI schema, desktop icon)

### UI Layouts

- [x] 3 pane view (wide)
- [ ] 3 pane view (email-like)
- [x] Automatic switching
- [ ] Reader Mode
- [ ] Dark Mode
- [ ] Custom Theme overrides

### UI Tools

- [ ] Simple Subscription Dialog
- [ ] Advanced Subscription Dialog
- [ ] Update Monitor
- [ ] Plugins Support (JS instead of Python)

## Icon

Simple icon done by icon.kitchen:

https://icon.kitchen/i/H4sIAAAAAAAAAz1QwU7DMAz9FWSuQ2o3qdp6Q4hxQ0jshji4jZNGpPVI045p2r9jp9p88nt%2Btp99gRnDRCPUFzAYfw4d9QR1ihOtwLrD%2BSgIEv0lyFiTGt7pNApubnUX0XgaVNO4txuQkS0HjqUoHmlXUrURQabWSlVUlOtKKBxckDGb4qr9nx3moePv5GMrBV38ol3aZHNk7tVaapNYBwo0Y1qUH2iMH5xuT3yE%2BqlcQfSuEz%2BaNpwS90seyGZW1lq358Wyxd6Hsx7JMz7sA%2BarOJjlK2oRjVODzw79oEXFd4NFsau2WxBdz2YK%2BtovudBE9kbEnvVzJ2rg%2B%2FoPV1m%2FVH0BAAA%3D
