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
        media = [];     // list of media content attached
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

        addMedia(url, mime, length) {
            let l = parseInt(length, 10);

            if (Number.isNaN(l))
                l = undefined;

            if(!url || !mime)
                return;

            /* gravatars are often supplied as media:content with medium='image'
               so we do not treat such occurences as enclosures */
            if (-1 !== url.indexOf('www.gravatar.com'))
                return;

            /* Never add enclosures for images already contained in the description */
            if (-1 !== this.description.indexOf(url))
                return;

            this.media.push({ url, mime, l });
        }
}