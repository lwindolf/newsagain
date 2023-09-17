// vim: set ts=4 sw=4:

// DAO for items

class Item {
        // state
        read = false;
        starred = false;

        // feed content
        title;
        description;
        source;
        sourceId;
        metadata = {};

        constructor(defaults) {
                Object.keys(defaults).forEach((k) => { this[k] = defaults[k] });
        }
}

export { Item };