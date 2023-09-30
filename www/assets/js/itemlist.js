// vim: set ts=4 sw=4:

// Managing a list of currently visible items

import { FeedList } from './feedlist.js';

class ItemList {
    // pretty print date from epoch
    static #getShortDateStr(time) {
        return new Intl.DateTimeFormat(
            'en-GB',
            {
                dateStyle: 'short',
                timeStyle: 'short',
                timeZone: 'GMT'
            }
        ).format(time*1000)
    }

    // load all items from the given node id
    static loadFeed(id) {
        let node = FeedList.getNodeById(id);

        // FIXME: handle folders

        if(!document.getElementById('itemlist'))
            return;

        document.getElementById('itemlistViewTitle').innerHTML = `
            <img class='icon' src='${node.icon}'/>
            <a target='_system' href='${node.homepage}'>${node.title}</a>
        `;
        document.getElementById('itemViewContent').innerHTML = '';
        document.getElementById('itemlistViewContent').innerHTML = `
            ${
                node.items.map(i => `
                    <div class='item' data-id='${i.id}' data-feed='${id}'>
                        <span class='date'>${ItemList.#getShortDateStr(i.time)}</span>
                        <span class='title'>${i.title}</span>
                    </div>`).join(' ')
            }
        `;
    }

    // load content of a single item
    static loadItem(feedId, id) {
        let node = FeedList.getNodeById(feedId);
        let item = node.getItemById(id);

        // FIXME: handle folders

        document.getElementById('itemViewTitle').innerHTML = `
            <img class='icon' src='${node.icon}'/>
            <a target='_system' href='${node.homepage}'>${node.title}</a>
        `;
        document.getElementById('itemViewContent').innerHTML = `
            <h1><a target='_system' href='${item.source}'>${item.title}</a></h1>
            <span class='date'>${ItemList.#getShortDateStr(item.time)}</span>
            <div class='date'></div>
            
            <p>${item.description}</p>
        `;
    }
}

export { ItemList };