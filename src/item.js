// vim: set ts=4 sw=4:
/* jshint esversion: 8 */

// DAO for items

class Item {
        // state
        read;
        starred;

        // feed content
        title;
        description;
        source;
        guid;
        metadata = {};

        constructor(defaults) {
                Object.keys(defaults).forEach((k) => { this[k] = defaults[k] });
        }
}

export { Item };