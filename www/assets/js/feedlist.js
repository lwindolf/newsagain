// vim: set ts=4 sw=4:

// Managing a tree of folders and feeds that are served by different
// subscriptions (e.g. local, Google Reader API, ...)

import { Feed } from './feed.js';

class FeedList {
    // hierarchical list of children
    static root = { children: [] };

    // id to node lookup map
    static nodeById = {};

    // Return node by id
    static getNodeById(id) {
        return FeedList.nodeById[id];
    }

    static #nodeUpdated(f) {
        // FIXME: folder recursion

        let unreadCount = f.items.filter((i) => {
            return (i.read === false);
        }).length;

        let e = document.querySelector(`.feed[data-id="${f.id}"]`);
        if(e)
            e.innerHTML = `
                <img class='icon' src='${f.icon}'/>
                <span class='title'>${f.title}</span>
                <span class='count' data-count='${unreadCount}'>${unreadCount}</span>
            `;
    }

    // Recursively create folder layout
    static #createFolder(folder) {
        // Needed for tests
        if(!document.getElementById('feedlist'))
            return;

        folder.children.forEach((f) => {
            // FIXME: support recursion
            document.getElementById('feedlistViewContent').innerHTML += `<div class='feed' data-id='${f.id}'></div>`;
            FeedList.nodeById[f.id] = f;
            FeedList.#nodeUpdated(f);
        });
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