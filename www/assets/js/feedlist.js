// vim: set ts=4 sw=4:

// Managing a tree of folders and feeds that are served by different
// subscriptions (e.g. local, Google Reader API, ...)

import { DB } from './db.js'
import { Feed } from './feed.js';
import { SimpleSubscriptionDialog } from './dialogs/simpleSubscription.js';
import { template, render } from './helpers/render.js';
import { forward } from './helpers/events.js';

export class FeedList {
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
        <span class='title'>
            {{#if feed.error}}
                [!]
            {{/if}}
            {{{feed.title}}}
        </span>
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
        DB.set('settings', 'feedlist', this.root);
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
        this.#createFolder(f);
        f.update();
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
    }

    static #getDefaultFeeds() {
        return {
            children: [
                { id: 0, title: "ArsTechnica", source: "https://feeds.arstechnica.com/arstechnica/features" },
                { id: 1, title: "LZone",       source: "https://lzone.de/feed/devops.xml" },
                { id: 2, title: "Slashdot",    source: "https://rss.slashdot.org/Slashdot/slashdotMain" },
                { id: 3, title: "Heise",       source: "https://www.heise.de/rss/heise.rdf" }
            ]
        };
    }

    // Load folders/feeds from DB
    static async #setup() {
        for(const f of (await DB.get('settings', 'feedlist', this.#getDefaultFeeds())).children) {
            this.root.children.push(new Feed(f));
        }
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
    }

    constructor() {
        FeedList.#setup();
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