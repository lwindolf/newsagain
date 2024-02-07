// vim: set ts=4 sw=4:

// Download, parse and merge feeds

import { parserAutoDiscover } from './parsers/autodiscover.js';
import { Favicon } from './parsers/favicon.js';

// FIXME: drop this hard-coded proxy
const proxy = 'https://corsproxy-1516.lars-windolf.workers.dev/corsproxy/?apiurl=';

export class FeedUpdater {
    static async fetch(url) {
        // Inject proxy on non-Phonegap environment
        let fetchURL = url;
        if(document.location.protocol !== 'file:')
            fetchURL = proxy + url;

        var feed = await fetch(fetchURL)
            .then((response) => {
                // FIXME: proper network state handling
                return response.text()
            })
            .then(async (str) => {
                let parser = parserAutoDiscover(str);
                let feed = parser.parse(str);
                feed.source = url;
                feed.last_updated = Date.now() / 1000;

                if(!feed.icon && feed.homepage)
                    try {
                        feed.icon = await Favicon.discover(feed.homepage);
                    } catch(e) { 
                        // ignore
                    }

                return feed;
            })
            .catch((e) => {
                // FIXME: proper error handling
                console.error(e)
            });
        return feed;
    }
}