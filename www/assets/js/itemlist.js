// vim: set ts=4 sw=4:

// Managing a list of currently visible items

import { FeedList } from './feedlist.js';
import { template, render } from './helpers/render.js';
import { connect, forward } from './helpers/events.js';
import { DateParser } from './parsers/date.js';

export class ItemList {
    static #headerTemplate = template(`
        <span class='switchView' data-view='{{view}}'>&lt;</span>
        <a class='title' target='_system' href='{{node.homepage}}'>{{node.title}}</a>
        {{#if node.icon}}
            <img class='icon' src='{{node.icon}}'/>
        {{/if}}
    `);

    static #itemUpdated(item) {
        document.querySelector(`.item[data-id="${item.id}"]`).innerHTML = `
            <span class='date'>${DateParser.getShortDateStr(item.time)}</span>
            <span class='title' data-read='${item.read}'>${item.title}</span>
        `;
    }

    // load all items from the given node id
    static loadFeed(id) {
        let node = FeedList.getNodeById(id);

        // FIXME: handle folders

        if(!document.getElementById('itemlist'))
            return;

        render('#itemlistViewTitle', ItemList.#headerTemplate, { node: node, view: 'feedlist' });
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

    // select an item
    static #selected(feedId, id) {
        let node = FeedList.getNodeById(feedId);
        let item = node.getItemById(id);

        [...document.querySelectorAll('.item.selected')]
            .forEach((n) => n.classList.remove('selected'));
        let itemNode = document.querySelector(`.item[data-id="${id}"]`);
        itemNode.classList.add('selected');
        itemNode.scrollIntoView({ block: 'nearest' });

        ItemList.selected = item;
        item.read = true
        document.dispatchEvent(new CustomEvent('itemUpdated', { detail: item }));
        document.dispatchEvent(new CustomEvent('nodeUpdated', { detail: node }));
    }

    // select next unread
    static nextUnread() {
        let item = ItemList.selected.node.getNextUnread(ItemList.selected.id);

        // FIXME: folder recursion
        
        if (item)
            document.dispatchEvent(new CustomEvent('itemSelected', { detail: { feed: ItemList.selected.node.id, id: item.id }}));
    }

    static #openItemLink(feedId, id) {
        let node = FeedList.getNodeById(feedId);
        let item = node.getItemById(id);

        window.open(item.source, '_system', 'location=yes');
    }

    static setup() {
        document.addEventListener('itemUpdated', (e) => {
            ItemList.#itemUpdated(e.detail);
        });
        document.addEventListener('itemSelected', (e) => {
            ItemList.#selected(e.detail.feed, e.detail.id)
        });
        document.addEventListener('itemReadToggle', (e) => {
            ItemList.toggleItemRead(e.detail.feed, e.detail.id);
        });

        connect('dblclick', '.item', (el) => {
            ItemList.#openItemLink(el.dataset.feed, el.dataset.id);
        });

        // emit signals
        forward('click', '.item', 'itemSelected');
        forward('auxclick', '.item', 'itemReadToggle', (e) => e.button == 1);
    }
}