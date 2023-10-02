// vim: set ts=4 sw=4:

// Managing a list of currently visible items

import { FeedList } from './feedlist.js';
import { template, render } from './helpers/render.js';

class ItemList {
    static headerTemplate = template(`
        <span class='switchView' data-view='{{view}}'>&lt;</span>
        <a class='title' target='_system' href='{{node.homepage}}'>{{node.title}}</a>
        {{#if node.icon}}
            <img class='icon' src='{{node.icon}}'/>
        {{/if}}
    `);

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

    static #itemUpdated(item) {
        document.querySelector(`.item[data-id="${item.id}"]`).innerHTML = `
            <span class='date'>${ItemList.#getShortDateStr(item.time)}</span>
            <span class='title' data-read='${item.read}'>${item.title}</span>
        `;
    }

    // load all items from the given node id
    static loadFeed(id) {
        let node = FeedList.getNodeById(id);

        // FIXME: handle folders

        if(!document.getElementById('itemlist'))
            return;

        render('#itemlistViewTitle', ItemList.headerTemplate, { node: node, view: 'feedlist' });
        document.getElementById('itemViewContent').innerHTML = '';
        document.getElementById('itemlistViewContent').innerHTML = node.items.map(i => `<div class='item' data-id='${i.id}' data-feed='${id}'></div>`).join(' ');
        node.items.forEach((i) => ItemList.#itemUpdated(i));
    }

    // toggle read status
    static toggleItemRead(feedId, id) {
        let node = FeedList.getNodeById(feedId);
        let item = node.getItemById(id);

        item.read = !item.read;

        document.dispatchEvent(new CustomEvent('itemUpdated', { detail: item }));
        document.dispatchEvent(new CustomEvent('nodeUpdated', { detail: node }));
    }

    // load content of a single item
    static loadItem(feedId, id) {
        let node = FeedList.getNodeById(feedId);
        let item = node.getItemById(id);

        item.read = true
        document.dispatchEvent(new CustomEvent('itemUpdated', { detail: item }));
        document.dispatchEvent(new CustomEvent('nodeUpdated', { detail: node }));

        // FIXME: handle folders

        render('#itemViewTitle', ItemList.headerTemplate, { node: node, view: 'itemlist' });
        document.getElementById('itemViewContent').innerHTML = `
            <h1><a target='_system' href='${item.source}'>${item.title}</a></h1>
            <span class='date'>${ItemList.#getShortDateStr(item.time)}</span>
            <div class='date'></div>
            
            <p>${item.description}</p>
        `;
    }

    static setup() {
        document.addEventListener('itemUpdated', (e) => {
            ItemList.#itemUpdated(e.detail);
        });
    }
}

export { ItemList };