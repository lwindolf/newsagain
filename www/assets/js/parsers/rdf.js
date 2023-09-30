// vim: set ts=4 sw=4:

// RSS 1.0 parser

import { DateParser } from './date.js';
import { XPath } from './xpath.js';
import { Feed } from '../feed.js';
import { Item } from '../item.js';

class RDFParser {
        static id = 'rdf';
        static autoDiscover = [
                '/rdf:RDF/ns:channel'
        ];

        static parseItem(node, feed) {
                let item = new Item({
                        title       : XPath.lookup(node, 'ns:title'),
                        description : XPath.lookup(node, 'ns:description'),
                        source      : XPath.lookup(node, 'ns:link'),
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
                                title       : XPath.lookup(root, '/rdf:RDF/ns:channel/ns:title'),
                                description : XPath.lookup(root, '/rdf:RDF/ns:channel/ns:description'),
                                homepage    : XPath.lookup(root, '/rdf:RDF/ns:channel/ns:link')
                        }};

                        XPath.foreach(root, '/rdf:RDF/ns:item', this.parseItem, feed);
                }

                return feed;
        }
}

export { RDFParser };