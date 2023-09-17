// vim: set ts=4 sw=4:
/* jshint esversion: 8 */

import { XPath } from './xpath.js';
import { Feed } from '../feed.js';
import { Item } from '../item.js';

class AtomParser {
        static id = 'atom';

        static parse(str) {              
                const parser = new DOMParser();
                const doc = parser.parseFromString(str, 'application/xml');
                const root = doc.firstChild;
                let feed = new Feed({
                        error       : XPath.lookup(root, '/parsererror'),
                        title       : XPath.lookup(root, '/feed/title'),
                        link        : XPath.lookup(root, '/feed/link/@href'),
                        description : XPath.lookup(root, '/feed/summary')
                });

                XPath.foreach(root, '/feed/entry', (node) => {
                        feed.items.push(new Item({
                                title       : XPath.lookup(node, 'title'),
                                description : XPath.lookup(node, 'summary'),
                                link        : XPath.lookup(node, 'link/@href')
                        }));
                });

                return feed;
        }
}

export { AtomParser };