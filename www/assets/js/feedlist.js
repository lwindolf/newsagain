// vim: set ts=4 sw=4:

// Managing a tree of folders and feeds that are served by different
// subscriptions (e.g. local, Google Reader API, ...)

import { Feed } from './feed.js';
import { FeedUpdater } from './feedupdater.js';

class FeedList {
    // hierarchical list of children
    static root = { children: [] };

    // Load folders/feeds from DB
    static load() {
        // FIXME: load from DB

        this.root = {
            children: [
                new Feed({ title: "Heise", source: "https://www.telepolis.de/news-atom.xml" }),
                new Feed({ title: "LZone", source: "https://lzone.de/feed/devops.xml" })
            ]
        };
        
        return this;
    }

    static #updateFolder(folder) {
        if(!folder.children)
            return;

        folder.children.forEach(node => {
            if(node.constructor.name === "Feed") {
                FeedUpdater.fetch(node.source).then((f) => {
                    console.log(f);
                    node = { ...node, ...f};
                    document.body.innerHTML += `
                        <h1>${f.title}</h1>
                        ${
                            f.items.map(i => `<div>${
                                    new Intl.DateTimeFormat(
                                        'en-GB',
                                        {
                                            dateStyle: 'short',
                                            timeStyle: 'short',
                                            timeZone: 'GMT'
                                        }
                                    ).format(i.time*1000)
                            } <a target="_system" href="${i.source}">${i.title}</a></div>`).join(' ')
                        }
                    `;
                });
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