// vim: set ts=4 sw=4:

// DAO for feeds

import { FeedUpdater } from './feedupdater.js';

export class Feed {
        // state
        id;
        error;
        orig_source;
        last_updated;
        etag;

        // feed content
        title;
        source;
        description;
        icon;
        metadata = {};
        items = [];

        // error code constants
        static ERROR_NONE     = 0;
        static ERROR_AUTH     = 1 << 0;
        static ERROR_NET      = 1 << 1;
        static ERROR_DISCOVER = 1 << 2;
        static ERROR_XML      = 1 << 3;

        constructor(defaults) {
            Object.keys(defaults).forEach((k) => { this[k] = defaults[k] });
        }

        update() {
            FeedUpdater.fetch(this.source).then((f) => {
                if(Feed.ERROR_NONE == f.error) {
                    this.title       = f.title;
                    this.source      = f.source;
                    this.homepage    = f.homepage;
                    this.description = f.description;
                    this.items       = f.items;
                    this.metadata    = f.metadata;

                    this.items.forEach((i) => {
                        i.node = this;
                    })

                    // feed provided favicon should always win
                    if(f.icon)
                        this.icon = f.icon;
                }

                this.error = f.error;
                document.dispatchEvent(new CustomEvent('nodeUpdated', { detail: this }));
            });
        }

        // Return the next unread item after the given id
        getNextUnread(id) {
            let item, idx;

            // search forward in feed items starting from id
            idx = 0;
            this.items.find((i) => { idx++; return (i.id === id); });   // find current item index
            item = this.items.slice(idx).find((i) => !i.read);          // find next unread item
            if(item)
                return item;

            // if nothing found search from start of feed
            return this.items.find((i) => !i.read);
        }

        getItemById(id) {
            let itemsById = {};
            this.items.forEach((i) => { itemsById[i.id] = i; });
            return itemsById[id];
        }
}