// vim: set ts=4 sw=4:

// Atom 1.0 support, 0.3 is not supported

import { DateParser } from './date.js';
import { XPath } from './xpath.js';
import { Feed } from '../feed.js';
import { Item } from '../item.js';

class AtomParser {
        static id = 'atom';
        static autoDiscover = [
                '/atom:feed/atom:entry'
        ];

        static parseEntryLink(node, ctxt) {
                let href = XPath.lookup(node, '@href');
                let type = XPath.lookup(node, '@type');
                let rel  = XPath.lookup(node, '@rel');

                if(href) {
                        // Always prefer those types of links
                        if((rel && rel === 'alternate') ||
                           (self && type === 'text/html')) {
                                ctxt.source = href;
                                return
                        }

                        // But also allow for a plain link
                        if(!ctxt.link)
                                ctxt.source = href;
                }
        }

        static parseEntry(node, feed) {
                let item = new Item({
                        title       : XPath.lookup(node, 'atom:title'),
                        description : XPath.lookup(node, 'atom:summary'),
                        sourceId    : XPath.lookup(node, 'atom:id'),
                        time        : DateParser.parse(XPath.lookup(node, 'atom:updated'))
                });
                XPath.foreach(node, 'atom:link', AtomParser.parseEntryLink, item);
                feed.items.push(item);
        }

        static parse(str) {              
                const parser = new DOMParser();
                const doc = parser.parseFromString(str, 'application/xml');
                const root = doc.firstChild;

                let feed = new Feed({
                        error       : XPath.lookup(root, '/parsererror'),
                        title       : XPath.lookup(root, '/atom:feed/atom:title'),
                        description : XPath.lookup(root, '/atom:feed/atom:summary'),
                        homepage    : XPath.lookup(root, "/atom:feed/atom:link[@rel='alternate']/@href") ||
                                      XPath.lookup(root, "/atom:feed/atom:link/@href")
                });

                XPath.foreach(root, '/atom:feed/atom:entry', this.parseEntry, feed);

                return feed;
        }
}

export { AtomParser };