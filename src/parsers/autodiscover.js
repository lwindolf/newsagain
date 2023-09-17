// vim: set ts=4 sw=4:

// Feed Autodiscovery

import { XPath } from './xpath.js';
import { AtomParser } from './atom.js';
import { RSSParser } from './rss.js';

// Return a parser class matching the given document string or undefined
function parserAutoDiscover(str) {
        var parsers = [ AtomParser, RSSParser ];
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, 'application/xml');

        for(let i = 0; i < parsers.length; i ++) {
                for(let j = 0; j < parsers[i].autoDiscover.length; j++) {                        
                        if(XPath.lookup(doc.firstChild, parsers[i].autoDiscover[j]))
                                return parsers[i];
                }
        }
}

export { parserAutoDiscover };