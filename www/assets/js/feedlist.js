// vim: set ts=4 sw=4:

// Managing a tree of folders and feeds that are served by different
// subscriptions (e.g. local, Google Reader API, ...)

import { Feed } from './feed.js';
import { ItemList } from './itemlist.js';
import { SimpleSubscriptionDialog } from './dialogs/simpleSubscription.js';
import { template, render } from './helpers/render.js';
import { forward } from './helpers/events.js';

class FeedList {
    // hierarchical list of children
    static root = { children: [] };

    // id to node lookup map
    static #nodeById = {};

    // currently selected node
    static #selected;

    // currently known max feed id
    static #maxId = 0;

    static feedTemplate = template(`
        {{#if feed.icon}}
            <img class='icon' src='{{feed.icon}}'/>
        {{/if}}
        <span class='title'>{{{feed.title}}}</span>
        <span class='count' data-count='{{feed.unreadCount}}'>{{feed.unreadCount}}</span>
    `);

    static childFeedsTemplate = template(`
        {{#each children}}
            <div class='feed' data-id='{{id}}'></div>
        {{/each}}
    `);

    // Return selected node id
    static getSelectedId() {
        return FeedList.#selected.id;
    }

    // Return node by id
    static getNodeById(id) {
        return FeedList.#nodeById[id];
    }

    static #nodeUpdated(feed) {
        // FIXME: folder recursion

        feed.unreadCount = feed.items.filter((i) => {
            return (i.read === false);
        }).length;

        render(`.feed[data-id="${feed.id}"]`, FeedList.feedTemplate, { feed: feed });
    }

    // Recursively create folder layout
    static #createFolder(folder) {
        // Needed for tests
        if(!document.getElementById('feedlist'))
            return;

        render('#feedlistViewContent', this.childFeedsTemplate, { children: folder.children });
        folder.children.forEach((f) => {
            // FIXME: support recursion
            if(f.id > FeedList.maxId)
                FeedList.maxId = f.id;
            FeedList.#nodeById[f.id] = f;
            FeedList.#nodeUpdated(f);
        });
    }

    // Add a new node (e.g. on subscribing)
    static add(f) {
        this.root.children.push(f);
        this.#createFolder(this.root);
        f.update();
        console.log(this.root);
    }

    // recursively mark all read on node and its children
    static #markAllRead(id) {
        let node = FeedList.getNodeById(id);

        // FIXME: support recursion

        node.items.forEach((i) => {
            if(i.read)
                return;

            i.read = true;
            if(node === FeedList.#selected)
                document.dispatchEvent(new CustomEvent('itemUpdated', { detail: i }));
        })
        document.dispatchEvent(new CustomEvent('nodeUpdated', { detail: node }));
    }

    // select the given node id
    static #select(id) {
        FeedList.#selected = FeedList.getNodeById(id);

        [...document.querySelectorAll('.feed.selected')]
            .forEach((n) => n.classList.remove('selected'));
        document.querySelector(`.feed[data-id="${id}"]`).classList.add('selected');
        ItemList.loadFeed(id);
    }

    // Load folders/feeds from DB
    static setup() {
        // FIXME: load from DB
        this.root = {
            children: [
                new Feed({ id: 1, title: "ArsTechnica", source: "https://feeds.arstechnica.com/arstechnica/features" }),
                new Feed({ id: 2, title: "LZone",       source: "https://lzone.de/feed/devops.xml" }),
                new Feed({ id: 3, title: "Slashdot",    source: "https://rss.slashdot.org/Slashdot/slashdotMain" }),
                new Feed({ id: 4, title: "Heise",       source: "https://www.heise.de/rss/heise.rdf" })
            ]
        };
        this.#createFolder(this.root);

        document.addEventListener('nodeUpdated', (e) => {
            FeedList.#nodeUpdated(e.detail);
        });
        document.addEventListener('feedSelected', (e) => {
            FeedList.#select(e.detail.id);
        });
        document.addEventListener('feedMarkAllRead', (e) => {
            FeedList.#markAllRead(e.detail.id);
        });
        document.addEventListener('click', (e) => {
            if(e.target.closest('.addBtn')) {
                new SimpleSubscriptionDialog();
            }
        });

        // emit signals
        forward('click', '.feed', 'feedSelected');
        forward('auxclick', '.feed', 'feedMarkAllRead', (e) => e.button == 1);

        // Run initial fetch
        this.update();

        return this;
    }

    // Recursively update folder
    static #updateFolder(folder) {
        if(!folder.children)
            return;

        folder.children.forEach(node => {
            if(node.constructor.name === "Feed") {
                node.update();
            } else {
                this.#updateFolder(node);
            }
        });
    }

    static update() {
        this.#updateFolder(this.root);
    }
}

export { FeedList };