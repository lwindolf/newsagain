// vim: set ts=4 sw=4:

// DAO for feeds

import { FeedUpdater } from './feedupdater.js';

class Feed {
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

        constructor(defaults) {
            Object.keys(defaults).forEach((k) => { this[k] = defaults[k] });
        }

        update() {
            FeedUpdater.fetch(this.source).then((f) => {
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

                document.dispatchEvent(new CustomEvent('nodeUpdated', { detail: this }));
            });
        }

        // Return the next unread item after the given id
        getNextUnread(id) {
            // search forward in feed items starting from id
            let idx = 0;
            let item = this.items.find((i) => { idx++; return (i.id === id); });
            if(idx < this.items.length + 1)
                return this.items[idx];

            return undefined;
        }

        getItemById(id) {
            let itemsById = {};
            this.items.forEach((i) => { itemsById[i.id] = i; });
            return itemsById[id];
        }
}

export { Feed };