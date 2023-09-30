// vim: set ts=4 sw=4:

import { FeedList } from './feedlist.js';
import { ItemList } from './itemlist.js';
import { Layout } from './layout.js';
import { debounce } from './helpers/debounce.js';

function setupApp() {
    FeedList.setup();
    ItemList.setup();
    Layout.update();

    window.onresize = debounce(function() {
        Layout.update();
    }, 100);

    // disable Electron menubar
    window.addEventListener('keydown', function(e) {
        if ((e.code === 'AltRight') || (e.code === 'AltLeft')) {
            e.preventDefault();
        }
    });

    document.addEventListener('click', function(e) {
        e = e.target;
        while(e) {
            if(e.classList?.contains('feed')) {
                [...document.querySelectorAll('.feed.selected')]
                    .forEach((e) => e.classList.remove('selected'));
                e.classList.add('selected');
                ItemList.loadFeed(e.dataset.id);
                Layout.view('itemlist');
                return;
            }
            if(e.classList?.contains('item')) {
                [...document.querySelectorAll('.item.selected')]
                    .forEach((e) => e.classList.remove('selected'));
                e.classList.add('selected');
                ItemList.loadItem(e.dataset.feed, e.dataset.id);
                Layout.view('item');
                return;
            }
            if(e.classList?.contains('switchView')) {
                Layout.view(e.dataset.view);
                return;
            }
            e = e.parentNode;
        }
    })
}

export { setupApp };
