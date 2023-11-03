// vim: set ts=4 sw=4:

import { DBSchema } from './dbschema.js';
import { FeedList } from './feedlist.js';
import { IndexedDB } from './indexeddb.js';
import { ItemList } from './itemlist.js';
import { ItemView } from './itemview.js';
import { Layout } from './layout.js';
import { HelpDialog } from './dialogs/help.js';
import { keydown } from './helpers/events.js';

export class App {
    // for easier debugging
    feedlist = FeedList;
    itemlist = ItemList;
    itemview = ItemView;
    layout = Layout;
    db;

    constructor() {
        FeedList.setup();
        ItemList.setup();
        ItemView.setup();
        Layout.setup();
    
        this.db = new IndexedDB(1, DBSchema.upgrade);

        // bind hotkeys to different GUI elements
        keydown('body', /* F1 */               (e) => (e.keyCode === 112),             () => new HelpDialog());
        keydown('body', /* Ctrl-right arrow */ (e) => (e.keyCode === 39 && e.ctrlKey), () => ItemList.nextUnread());
        keydown('body', /* Ctrl-S */           (e) => (e.keyCode === 83 && e.ctrlKey), () => document.dispatchEvent(new CustomEvent("feedMarkAllRead", { detail: { id: FeedList.getSelectedId()}})));
        keydown('body', /* Ctrl-U */           (e) => (e.keyCode === 85 && e.ctrlKey), () => FeedList.update());

        window.app = this;
    }
}