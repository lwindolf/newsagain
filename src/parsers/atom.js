// vim: set ts=4 sw=4:
/*jshint esversion: 8 */

import { XPath } from './xpath.js';

class AtomParser {
        static id = 'atom';

        static parse(str) {
                // FIXME: use feed class
                let feed = {
                        // state
                        error: undefined,

                        // feed content
                        items: [],
                        title: undefined,
                        link: undefined,
                        description: undefined,
                        icon: undefined
                };

                const parser = new DOMParser();
                const doc = parser.parseFromString(str, "application/xml");
                const root = doc.firstChild;

                feed.error = doc.querySelector("parsererror");
                if (!feed.error) {
                        feed.title       = XPath.lookup(root, '/feed/title');
                        feed.link        = XPath.lookup(root, '/feed/link/@href');
                        feed.description = XPath.lookup(root, '/feed/summary');

                        XPath.foreach(root, '/feed/entry', (node) => {
                                // FIXME: use item class
                                var item = {
                                        title       : XPath.lookup(node, 'title'),
                                        description : XPath.lookup(node, 'summary'),
                                        link        : XPath.lookup(node, 'link/@href')
                                };
                                feed.items.push(item);
                        });
                }

                return feed;
        }
}

export { AtomParser };