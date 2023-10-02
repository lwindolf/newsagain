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
        let n = e.target;
        while(n) {
            if(n.classList?.contains('feed')) {
                [...document.querySelectorAll('.feed.selected')]
                    .forEach((n) => n.classList.remove('selected'));
                n.classList.add('selected');
                ItemList.loadFeed(n.dataset.id);
                Layout.view('itemlist');
                e.preventDefault();
                return;
            }
            if(n.classList?.contains('item')) {
                [...document.querySelectorAll('.item.selected')]
                    .forEach((n) => n.classList.remove('selected'));
                n.classList.add('selected');
                ItemList.loadItem(n.dataset.feed, n.dataset.id);
                Layout.view('item');
                e.preventDefault();
                return;
            }
            if(n.classList?.contains('switchView')) {
                Layout.view(n.dataset.view);
                e.preventDefault();
                return;
            }
            n = n.parentNode;
        }
    })

    document.addEventListener('auxclick', function(e) {
        let n = e.target;
        while(n) {
            if(n.classList?.contains('item')) {
                if (e.button === 1) {                   
                    e.preventDefault();
                    ItemList.toggleItemRead(n.dataset.feed, n.dataset.id);
                }
                return;
            }
            n = n.parentNode;
        }
    });
}

export { setupApp };
