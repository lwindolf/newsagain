// vim: set ts=4 sw=4:
/*jshint esversion: 8 */

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
                        description: undefined,
                        icon: undefined
                };

                const parser = new DOMParser();
                const doc = parser.parseFromString(str, "application/xml");

                feed.error = doc.querySelector("parsererror");
                if (!feed.error)
                        feed.title = doc.documentElement.nodeName;

                return feed;
        }
        
};

export { AtomParser };