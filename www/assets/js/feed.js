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
                // FIXME: this.icon        = f.icon;
                this.items       = f.items;
                this.metadata    = f.metadata;
            });
        }

        getItemById(id) {
            let itemsById = {};
            this.items.forEach((i) => { itemsById[i.id] = i; });
            return itemsById[id];
        }
}

export { Feed };