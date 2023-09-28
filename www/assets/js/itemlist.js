// vim: set ts=4 sw=4:

// Managing a list of currently visible items

import { FeedList } from './feedlist.js';

class ItemList {
    static setup() {
        document.addEventListener('click', function(e) {
            e = e.target;
            while(undefined !== e) {
                if(e.classList.contains('feed')) {
                    ItemList.loadFeed(e.dataset.id);
                    return;
                }
                e = e.parentNode;
            }
        })
        document.addEventListener('click', function(e) {
            e = e.target;
            while(undefined !== e) {
                if(e.classList.contains('item')) {
                    ItemList.loadItem(e.dataset.feed, e.dataset.id);
                    return;
                }
                e = e.parentNode;
            }
        });
    }

    // load all items from the given node id
    static loadFeed(id) {
        let node = FeedList.getNodeById(id);

        // FIXME: handle folders

        if(!document.getElementById('itemlist'))
            return;

        document.getElementById('item').innerHTML = '';
        document.getElementById('itemlist').innerHTML = `
            ${
                node.items.map(i => `<div class='item' data-id='${i.id}' data-feed='${id}'>${                           
                        new Intl.DateTimeFormat(
                            'en-GB',
                            {
                                dateStyle: 'short',
                                timeStyle: 'short',
                                timeZone: 'GMT'
                            }
                        ).format(i.time*1000)
                } <span class='title'>${i.title}</span></div>`).join(' ')
            }
        `;
    }

    // load content of a single item
    static loadItem(feedId, id) {
        let node = FeedList.getNodeById(feedId);
        let item = node.getItemById(id);

        // FIXME: handle folders

        document.getElementById('item').innerHTML = `
            <h1><a href='${item.source}'>${item.title}</a></h1>
            
            <p>${item.description}</p>
        `;
    }
}

export { ItemList };