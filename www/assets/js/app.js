// vim: set ts=4 sw=4:

import { FeedList } from './feedlist.js';
import { ItemList } from './itemlist.js';
import { Layout } from './layout.js';

// generic event forwarding with dataset as detail
// allows for optional check condition function to verify the event (e.g. button check)
function connect(eventName, selector, customEventName, condition = undefined) {
    document.addEventListener(eventName, function(e) {
        let n = e.target.closest(selector);

        if(condition && !condition(e))
            return;

        if (n) {
            document.dispatchEvent(new CustomEvent(customEventName, {
                detail: n.dataset
            }));        
            e.preventDefault();
        }
    });
}

function setupApp() {
    FeedList.setup();
    ItemList.setup();
    Layout.setup();

    connect('click', '.feed', 'feedSelected');
    connect('click', '.item', 'itemSelected');
    connect('auxclick', '.item', 'itemReadToggle',  (e) => e.button == 1);
    connect('auxclick', '.feed', 'feedMarkAllRead', (e) => e.button == 1);
}

export { setupApp };
