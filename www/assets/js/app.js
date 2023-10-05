// vim: set ts=4 sw=4:

import { FeedList } from './feedlist.js';
import { ItemList } from './itemlist.js';
import { ItemView } from './itemview.js';
import { Layout } from './layout.js';
import { HelpDialog } from './dialogs/help.js';
import { keydown } from './helpers/events.js';

class App {
    static #touchStart;

    // for easier debugging
    feedlist = FeedList;
    itemlist = ItemList;
    itemview = ItemView;
    layout = Layout;

    constructor() {
        FeedList.setup();
        ItemList.setup();
        ItemView.setup();
        Layout.setup();

        keydown('body', /* F1 */               (e) => (e.keyCode === 112),             () => new HelpDialog());
        keydown('body', /* Ctrl-right arrow */ (e) => (e.keyCode === 39 && e.ctrlKey), () => ItemList.nextUnread());
        keydown('body', /* Ctrl-S */           (e) => (e.keyCode === 83 && e.ctrlKey), () => document.dispatchEvent(new CustomEvent("feedMarkAllRead", { detail: { id: FeedList.getSelectedId()}})));
        keydown('body', /* Ctrl-U */           (e) => (e.keyCode === 85 && e.ctrlKey), () => FeedList.update());

        // Touch swiping 
        document.addEventListener('touchstart', (e) => {
            App.#touchStart = e.touches[0];
        }, {
            passive: true
        })
        document.addEventListener('touchmove', (e) => {
            if(!App.#touchStart)
                return;

            let diff = App.#touchStart.clientX - e.touches[0].clientX;
            if (Math.abs(diff) > 10) { // FIXME: make 10 a window width percentage
                if (diff < 0)
                    Layout.back();
                else
                    Layout.forward();
            }

            App.#touchStart = null;
        }, {
            capture: true,
            passive: false,
        })

        window.app = this;
    }
}

export { App };
