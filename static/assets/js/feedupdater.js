// vim: set ts=4 sw=4:

// Download, parse and merge feeds

import { parserAutoDiscover } from './parsers/autodiscover.js';

class FeedUpdater {
    static async fetch(url) {
        // FIXME: hard coded proxy details are evil
        var proxyurl = 'https://corsproxy-1516.lars-windolf.workers.dev/corsproxy/?apiurl='+url;

        var feed = await fetch(proxyurl)
            .then((response) => {
                // FIXME: proper network state handling
                return response.text()
            })
            .then((str) => {
                let p = parserAutoDiscover(str);
                return p.parse(str)
            })
            .catch((e) => {
                // FIXME: proper error handling
                console.error(e)
            });
        
        return feed;
    }
}

export { FeedUpdater };