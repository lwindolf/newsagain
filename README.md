[![CI](https://github.com/lwindolf/newsagain/actions/workflows/test.yml/badge.svg)](https://github.com/lwindolf/newsagain/actions/workflows/test.yml)

# NewsAgain

![NewsAgain Icon](icons/web/icon-192.png)

WIP prototype for a backend-less PWA feed reader replacing [Liferea](https://lzone.de/liferea)

Please note that running a PWA feed reader requires using a CORS proxy which has some
security implications.

## Start using it

Just open [https://lwindolf.github.io/newsagain](https://lwindolf.github.io/newsagain)

Alternatively host it yourself by uploading the `www` folder on your own webserver.

## Building

    npm install
    npm test
    npm run build       # To install NPM dependencies into assets/js/lib
    npx serve

## Feature-Completeness

As NewsAgain will be a successor to Liferea it needs to roughly match the most important
features and provide a desktop migration path. Here is the status of the features. Note that
a 🛑 means the feature won't be ported.

### Parsing 

- [x] Atom 1.0 / RSS 1.0, 1.1 and 2.0
- [x] Dublin Core RSS namespace support
- [x] media namespace support
- [x] Favicon discovery
- [x] Feed auto discovery 
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
- [x] CORS Proxy Support (via CloudFlare)
- 🛑 Proxy Support

### Online Source Support

- [ ] Google Reader API (Miniflux, FreshRSS, ...) 
- [ ] TinyTinyRSS
- [ ] InoReader
- [ ] TheOldReader
- [ ] Reedah
- [ ] OPML Import
- 🛑 local OPML sources

### UI Navigation

- [x] Feed list
- [ ] Hierarchic feed list folders
- [ ] Search folders
- [x] Item list
- [x] Item view
- [x] Desktop mouse selectionchuba
- [x] Middle click behaviour
- [x] Launching external browser
- [ ] Launching internal browser
- [ ] Drag&Drop
- [ ] Keyboard navigation
- [ ] XDG Integration (URI schema, desktop icon)

### UI Layouts

- [x] 3 pane view (wide)
- [x] 1 pane view (mobile)
- [x] Automatic switching
- [ ] Reader Mode
- [x] Dark Mode
- [ ] Custom Theme overrides
- 🛑 3 pane view (email like)

### UI Tools

- [x] Simple Subscription Dialog
- [ ] Advanced Subscription Dialog
- [ ] Update Monitor
- [ ] Plugins Support (JS instead of Python)
- 🛑 Tray Icon

## Icon

Simple icon done by icon.kitchen:

https://icon.kitchen/i/H4sIAAAAAAAAAz1QwU7DMAz9FWSuQ2o3qdp6Q4hxQ0jshji4jZNGpPVI045p2r9jp9p88nt%2Btp99gRnDRCPUFzAYfw4d9QR1ihOtwLrD%2BSgIEv0lyFiTGt7pNApubnUX0XgaVNO4txuQkS0HjqUoHmlXUrURQabWSlVUlOtKKBxckDGb4qr9nx3moePv5GMrBV38ol3aZHNk7tVaapNYBwo0Y1qUH2iMH5xuT3yE%2BqlcQfSuEz%2BaNpwS90seyGZW1lq358Wyxd6Hsx7JMz7sA%2BarOJjlK2oRjVODzw79oEXFd4NFsau2WxBdz2YK%2BtovudBE9kbEnvVzJ2rg%2B%2FoPV1m%2FVH0BAAA%3D
