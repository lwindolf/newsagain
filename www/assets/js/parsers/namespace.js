// vim: set ts=4 sw=4:

// Generic RSS namespaces parser

import { DateParser } from './date.js';
import { XPath } from './xpath.js';

export class NamespaceParser {
    /**
     * Parse all RSS namespace childs of a given DOM node
     * 
     * @param {*} node        the item DOM node
     * @param {*} nsList      an array of namespace identifiers e.g. ["media", "dc"]
     * @param {*} feed        the feed
     * @param {*} item        the item
     */
    static parseItem(node, nsList, feed, item) {
        // Dublin Core support
        if (nsList.includes('dc')) {
            if (!item.description)
                item.description = XPath.lookup(node, 'dc:description');
            if (!item.time)
                item.time = DateParser.parse(XPath.lookup(node, 'dc:date'));
        }

        // Content support
        if (nsList.includes('content')) {
            const n = XPath.lookupNode(node, 'content:encoded');
            if (n) {
                try {
                    // Always override description
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(`<a>${n.innerHTML}</a>`, 'text/xml');
                    // FIXME: limit extract to body only
                    item.description = doc.documentElement.textContent;
                } catch (e) {
                    console.log(`Failed to parse <content:encoded> (${e})!`);
                }
            }
        }

        // Media support
        if (nsList.includes('media')) {
            /*
                Maximual definition could look like this:
            
                <media:content 
                        url="http://www.foo.com/movie.mov" 
                        fileSize="12216320" 
                        type="video/quicktime"
                        medium="video"
                        isDefault="true" 
                        expression="full" 
                        bitrate="128" 
                        framerate="25"
                        samplingrate="44.1"
                        channels="2"
                        duration="185" 
                        height="200"
                        width="300" 
                        lang="en" />
                    
                (example quoted from specification)
            */
            XPath.foreach(node, '//media:content', (n) => {
                    item.addMedia(
                        n.lookup('@url'),
                        n.lookup('@type') || n.lookup('@medium'),
                        n.lookup('@duration')
                    );    
            });
        }
    }
}