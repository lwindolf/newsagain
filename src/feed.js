// vim: set ts=4 sw=4:
/* jshint esversion: 8 */

// DAO for feeds

class Feed {
        // state
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
}

export { Feed };