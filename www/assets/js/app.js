// vim: set ts=4 sw=4:

import { FeedList } from './feedlist.js';
import { ItemList } from './itemlist.js';
import { Layout } from './layout.js';
import { HelpDialog } from './dialogs/help.js';
import { forward, keydown } from './helpers/events.js';

function setupApp() {
    FeedList.setup();
    ItemList.setup();
    Layout.setup();

    forward('click', '.feed', 'feedSelected');
    forward('click', '.item', 'itemSelected');
    forward('auxclick', '.item', 'itemReadToggle',  (e) => e.button == 1);
    forward('auxclick', '.feed', 'feedMarkAllRead', (e) => e.button == 1);

    keydown('body', /* F1 */        (e) => (e.keyCode === 112),             () => new HelpDialog());
    keydown('body', /* Ctrl-S */    (e) => (e.keyCode === 83 && e.ctrlKey), () => document.dispatchEvent(new CustomEvent("feedMarkAllRead", { detail: { id: FeedList.getSelectedId()}})));
    keydown('body', /* Ctrl-U */    (e) => (e.keyCode === 85 && e.ctrlKey), () => FeedList.update());
}

export { setupApp };
