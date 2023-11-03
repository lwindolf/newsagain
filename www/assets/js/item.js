// vim: set ts=4 sw=4:

// DAO for items

export class Item {
        // maximum id currently used
        static maxId = 0;

        // state
        id = 0;
        read = false;
        starred = false;

        // item content
        title;
        description;
        time;
        source;
        sourceId;
        metadata = {};

        constructor(defaults) {
                Object.keys(defaults).forEach((k) => { this[k] = defaults[k] });

                if(Number.isInteger(this.id) && this.id > Item.maxId)
                    Item.maxId = this.id;

                if(0 === this.id) {
                    Item.maxId++;
                    this.id = Item.maxId;
                }
        }
}