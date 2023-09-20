// vim: set ts=4 sw=4:

// RSS 1.0 and 2.0 parser, 0.9x is not supported

import { DateParser } from './date.js';
import { XPath } from './xpath.js';
import { Feed } from '../feed.js';
import { Item } from '../item.js';

class RSSParser {
        static id = 'rss';
        static autoDiscover = [
                '/rss/channel',
                '/Channel/items',
                '/rdf:RDF/channel'
        ];

        static parseItem(node, feed) {
                let item = new Item({
                        title       : XPath.lookup(node, 'title'),
                        description : XPath.lookup(node, 'description'),
                        source      : XPath.lookup(node, 'link'),
                        // RSS 2.0 only
                        sourceId    : XPath.lookup(node, 'guid'),
                        time        : DateParser.parse(XPath.lookup(node, 'pubDate'))
                });

                // Dublin Core support
                if(!item.description)
                        item.description = XPath.lookup(node, 'dc:description');
                if(!item.time)
                        item.time = DateParser.parse(XPath.lookup(node, 'dc:date'));

                // Finally some guessing
                if(!item.time)
                        item.time = Date.now();
                // FIXME: set an id

                feed.items.push(item);
        }

        static parse(str) {              
                const parser = new DOMParser();
                const doc = parser.parseFromString(str, 'application/xml');
                const root = doc.firstChild;
                let feed = new Feed({
                        error       : XPath.lookup(root, '/parsererror'),
                });

                // RSS 1.0
                if(doc.firstChild.nodeName === 'rdf:RDF') {
                        feed = {...feed, ...{
                                title       : XPath.lookup(root, '/rdf:RDF/channel/title'),
                                description : XPath.lookup(root, '/rdf:RDF/channel/description'),
                                source      : XPath.lookup(root, '/rdf:RDF/channel/link')
                        }};

                        XPath.foreach(root, '/rdf:RDF/item', this.parseItem, feed);
                }

                // RSS 1.1
                if(doc.firstChild.nodeName === 'Channel') {
                        feed = {...feed, ...{
                                title       : XPath.lookup(root, '/Channel/title'),
                                description : XPath.lookup(root, '/Channel/description'),
                                source      : XPath.lookup(root, '/Channel/link')
                        }};

                        XPath.foreach(root, '/Channel/items/item', this.parseItem, feed);
                }

                // RSS 2.0
                if(doc.firstChild.nodeName === 'rss') {
                        feed = {...feed, ...{
                                title       : XPath.lookup(root, '/rss/channel/title'),
                                description : XPath.lookup(root, '/rss/channel/description'),
                                source      : XPath.lookup(root, '/rss/channel/link'),
                        }};

                        XPath.foreach(root, '/rss/channel/item', this.parseItem, feed);
                }

                return feed;
        }
}

export { RSSParser };