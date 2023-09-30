// vim: set ts=4 sw=4:

// Download, parse and merge feeds

import { parserAutoDiscover } from './parsers/autodiscover.js';

class FeedUpdater {
    static async fetch(url) {
        var feed = await fetch(url)
            .then((response) => {
                // FIXME: proper network state handling
                return response.text()
            })
            .then((str) => {
                let parser = parserAutoDiscover(str);
                let feed = parser.parse(str);
                feed.source = url;
                feed.last_updated = Date.now() / 1000;

                return feed;
            })
            .catch((e) => {
                // FIXME: proper error handling
                console.error(e)
            });
        return feed;
    }
}

export { FeedUpdater };