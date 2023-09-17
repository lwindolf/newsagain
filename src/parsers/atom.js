// vim: set ts=4 sw=4:

import { XPath } from './xpath.js';
import { Feed } from '../feed.js';
import { Item } from '../item.js';

class AtomParser {
        static id = 'atom';

        // can be used for both Item and Feed
        static parseAtomLink(node, ctxt) {
                let href = XPath.lookup(node, './@href');
                let type = XPath.lookup(node, './@type');
		let rel  = XPath.lookup(node, './@rel');

                if(href) {
                        // Always prefer those types of links
                        if((rel && rel === 'alternate') ||
                           (self && type === 'text/html')) {
                                ctxt.source = href;
                                return
                        }

                        // But also allow for a plain link
                        if(!ctxt.source)
                                ctxt.source = href;
                }
        }

        static parseEntry(node, feed) {
                let item = new Item({
                        title       : XPath.lookup(node, 'title'),
                        description : XPath.lookup(node, 'summary')
                });
                XPath.foreach(node, './link', AtomParser.parseAtomLink, item);
                feed.items.push(item);
        }

        static parse(str) {              
                const parser = new DOMParser();
                const doc = parser.parseFromString(str, 'application/xml');
                const root = doc.firstChild;

                let feed = new Feed({
                        error       : XPath.lookup(root, '/parsererror'),
                        title       : XPath.lookup(root, '/feed/title'),
                        description : XPath.lookup(root, '/feed/summary')
                });

                XPath.foreach(root, '/feed/link', this.parseAtomLink, feed);
                XPath.foreach(root, '/feed/entry', this.parseEntry, feed);

                return feed;
        }
}

export { AtomParser };