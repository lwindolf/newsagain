// vim: set ts=4 sw=4:

// Managing a list of currently visible items

import { FeedList } from './feedlist.js';
import { template, render } from './helpers/render.js';
import { DateParser } from './parsers/date.js';
import * as ev from './helpers/events.js';

export class ItemList {
    // state
    selected;       // selected item (or undefined)

    static #headerTemplate = template(`
        <span class='switchView' data-view='{{view}}'>&lt;</span>
        <a class='title' target='_system' href='{{node.homepage}}'>{{node.title}}</a>
        {{#if node.icon}}
            <img class='icon' src='{{node.icon}}'/>
        {{/if}}
    `);

    static #listTemplate = template(`
        {{#each node.items}}
            <div class='item' data-id='{{id}}' data-feed='{{node.id}}'></div>
        {{/each}}
    `);

    static #itemTemplate = template(`
        <span class='date'>{{time}}</span>
        <span class='title' data-read='{{read}}'>{{title}}</span>
    `);

    static #itemUpdated(item) {
        render(`.item[data-id="${item.id}"]`, ItemList.#itemTemplate, {
            time: DateParser.getShortDateStr(item.time),
            read: item.read,
            title: item.title
        });
    }

    // load all items from the given node id
    static #loadFeed(id) {
        let node = FeedList.getNodeById(id);

        // FIXME: handle folders

        if(!document.getElementById('itemlist'))
            return;

        render('#itemlistViewTitle', ItemList.#headerTemplate, { node, view: 'feedlist' });
        render('#itemlistViewContent', ItemList.#listTemplate, { node });
        node.items.forEach((i) => ItemList.#itemUpdated(i));
    }

    // toggle read status
    static #toggleItemRead(feedId, id) {
        let node = FeedList.getNodeById(feedId);
        let item = node.getItemById(id);

        item.read = !item.read;

        ev.dispatch('itemUpdated', item);
        ev.dispatch('nodeUpdated', node);
    }

    // select an item
    static select(feedId, id) {
        let node = FeedList.getNodeById(feedId);
        let item = node.getItemById(id);

        [...document.querySelectorAll('.item.selected')]
            .forEach((n) => n.classList.remove('selected'));
        let itemNode = document.querySelector(`.item[data-id="${id}"]`);
        itemNode.classList.add('selected');
        itemNode.scrollIntoView({ block: 'nearest' });

        ItemList.selected = item;
        if(!item.read) {
            item.read = true
            ev.dispatch('itemUpdated', item);
            ev.dispatch('nodeUpdated', node);
        }

        ev.dispatch('itemSelected', { feed: node.id, id: item.id });
    }

    // select next unread
    static nextUnread() {
        let item, node, id;
        
        if(ItemList.selected) {
            node = ItemList.selected.node
            id = ItemList.selected.id;
        } else {
            // select first node if none is selected
            node = FeedList.getNextUnreadNode(0);
            id = 0;
        }

        // Try looking in same feed/folder
        item = node.getNextUnread(id);

        // Switch to next feed if needed
        if(!item) {
            node = FeedList.getNextUnreadNode(node.id);
            item = node.getNextUnread(id);
        }

        // FIXME: folder recursion
        if(item) {
            FeedList.select(node.id);
            ItemList.select(node.id, item.id);
        }
    }

    static #openItemLink(feedId, id) {
        let node = FeedList.getNodeById(feedId);
        let item = node.getItemById(id);

        window.open(item.source, '_system', 'location=yes');
    }

    constructor() {
        document.addEventListener('itemUpdated', (e) => ItemList.#itemUpdated(e.detail));
        document.addEventListener('feedSelected', (e) => ItemList.#loadFeed(e.detail.id));

        // handle mouse events
        ev.connect('auxclick', '.item', (el) => {
            ItemList.#toggleItemRead(el.dataset.feed, el.dataset.id);
        }, (e) => e.button == 1);

        ev.connect('click', '.item', (el) => {
            if (el.clickTimer) {
                // double click
                clearTimeout(el.clickTimer);
                ItemList.#openItemLink(el.dataset.feed, el.dataset.id);
            }
            el.clickTimer = setTimeout(() => {
                // single click
                ItemList.select(el.dataset.feed, el.dataset.id)
            });
        });

    }
}