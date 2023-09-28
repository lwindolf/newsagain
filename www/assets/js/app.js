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

    // switchView all buttons
}

export { setupApp };
