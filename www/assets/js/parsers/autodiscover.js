// vim: set ts=4 sw=4:

// Feed Autodiscovery
//
// 1.) link discovery in HTML documents
// 2.) type discovery in feed documents (parser factory)

import { XPath } from './xpath.js';
import { AtomParser } from './atom.js';
import { RSSParser } from './rss.js';
import { RDFParser } from './rdf.js';

// Return a parser class matching the given document string or undefined
function parserAutoDiscover(str) {
    var parsers = [ AtomParser, RSSParser, RDFParser ];
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'application/xml');

    for(let i = 0; i < parsers.length; i++) {
        for(let j = 0; j < parsers[i].autoDiscover.length; j++) {     
            try {
                if(XPath.lookup(doc.firstChild, parsers[i].autoDiscover[j]))
                    return parsers[i];
            } catch(e) {
                console.log(e);
            }
        }
    }
    return undefined;
}

// for a given HTML document link return all feed links found
async function linkAutoDiscover(url) {
    // Parse HTML
    const doc = await fetch(url)
        .then((response) => response.text())
        .then((str) => {
            return new DOMParser().parseFromString(str, 'text/html');
        });

    if(!doc)
        return [];

    // DOCTYPE node is first child when parsing HTML5, we need to 
    // find the <html> root node in this case
    let root = doc.firstChild;
    while(root && root.nodeName !== 'HTML') {
        root = root.nextSibling;
    }

    let results = [];
    XPath.foreach(root,
                  "/html/head/link[@rel='alternate'][@type='application/atom+xml' or @type='application/rss+xml' or @type='application/rdf+xml' or @type='text/xml']",
                  (node) => {
                        let href = XPath.lookup(node, '@href');
                        if(!href.includes("://"))
                            if(!href.startsWith('/') || url[url.length - 1] === '/')
                                href = url + '/' + href;
                            else
                                href = url + href;
                        results.push(href);
                  });

    return results;
}

export { parserAutoDiscover, linkAutoDiscover };