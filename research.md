
## Goals

- an rss reader
- 20 years maintained
  - to allow for this: no framework (React, Vue, ...)
  - vanilla JS only
- no mandatory backend storage (e.g. commercial Feedly, TheOldReader, nor OSS like TTRSS, FreshRSS)
- implemented as progressive web app
- functionality over style

## Runtime Dependencies

- DOMPurify
- handlebars
- handlebars layout
- remotestorage
- remotestorage-widget

## Deployment

1. PWA hosted on lzone.de (cannot be hosted on Github due to CORS headers needed)
2. Android APK packaged using Bubblewrap in f-droid

Idea is to account for lzone.de to be gone and to have a fallback in the form of the APK in the app store
