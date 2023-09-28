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

    // Recursively create folder layout
    static #createFolder(folder) {
        // Needed for tests
        if(!document.getElementById('feedlist'))
            return;

        folder.children.forEach((f) => {
            // FIXME: support recursion
            FeedList.nodeById[f.id] = f;
            document.getElementById('feedlist').innerHTML += `
                <div class='feed' data-id='${f.id}'>
                    <img class='icon' src='${f.icon}'/>
                    ${f.title}
                </div>`;
        });
    }

    // Load folders/feeds from DB
    static setup() {
        // FIXME: load from DB

        this.root = {
            children: [
                new Feed({ id: 1, title: "ArsTechnica", icon: "https://arstechnica.com/favicon.ico", source: "https://feeds.arstechnica.com/arstechnica/features" }),
                new Feed({ id: 2, title: "LZone", icon: "https://lzone.de/favicon.ico",     source: "https://lzone.de/feed/devops.xml" }),
                new Feed({ id: 3, title: "Slashdot", icon: "https://slashdot.org/favicon.ico", source: "https://rss.slashdot.org/Slashdot/slashdotMain" })
            ]
        };
        this.#createFolder(this.root);

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