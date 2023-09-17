
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

## CORS Proxy

As almost noone supplies RSS feeds with `Access-Control-Allow-Origin: '*'` it is impossible to 
build a PWA feed reader without a CORS proxy. Which is quite stupid, as RSS/Atom feeds are intented
to be consumed outside of the website.

Best solution seems to be a CORS proxy using a [Cloudflare worker](https://developers.cloudflare.com/workers/examples/cors-header-proxy).

Pricing with Cloudflare right now is:
- free plan 1 worker: 100000 req/day
- paid $5 per 10Mio requests/month

By for example limiting the maximum number of subscriptions support to e.g. 200 and by allowing only 
5 daily updates $5 can serve 10Mio / 200 / 5 / 30 = at least 350 conccurent users which would be a 
reasonable price. The challenge of course lies with preventing abuse of the proxy.

## Deployment

1. PWA hosted on lzone.de (cannot be hosted on Github due to CORS headers needed)
2. Android APK packaged using Bubblewrap in f-droid

Idea is to account for lzone.de to be gone and to have a fallback in the form of the APK in the app store
