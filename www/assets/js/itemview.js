// vim: set ts=4 sw=4:

// Item rendering view

import { DateParser } from './parsers/date.js';
import { FeedList } from './feedlist.js';
import { template, render } from './helpers/render.js';
import { connect, forward } from './helpers/events.js';

class ItemView {
    static #headerTemplate = template(`
        <span class='switchView' data-view='{{view}}'>&lt;</span>
        <a class='title' target='_system' href='{{node.homepage}}'>{{node.title}}</a>
        {{#if node.icon}}
            <img class='icon' src='{{node.icon}}'/>
        {{/if}}
    `);
    static #contentTemplate = template(`
        <h1>
            <a target='_system' href='{{item.source}}'>{{item.title}}</a>
        </h1>
        <span class='date'>{{time}}</span>
        <div class='date'></div>
    
        <p>{{{item.description}}}</p>
    `);

    // load content of a single item
    static #loadItem(feedId, id) {
        let node = FeedList.getNodeById(feedId);
        let item = node.getItemById(id);
console.log(`loadItem(${feedId}, ${id})`);
        render('#itemViewTitle', ItemView.#headerTemplate, { node: node, view: 'itemlist' });
        render('#itemViewContent', ItemView.#contentTemplate, { item: item, time: DateParser.getShortDateStr(item.time) });
    }

    static #showLink(link, visible) {
        document.getElementById('linkHover').innerText = link;
        document.getElementById('linkHover').style.display = visible?'block':'none';
    }

    static setup() {
        document.addEventListener('itemSelected', (e) => {
            ItemView.#loadItem(e.detail.feed, e.detail.id);
        });

        if(cordova.platformId === 'electron') {
            connect('mouseover', 'a', (el) => {
                ItemView.#showLink(el.getAttribute('href'), true);
            });
            connect('mouseout', 'a', (el) => {
                ItemView.#showLink(el.getAttribute('href'), false)
            });
        }
    }
}

export { ItemView };