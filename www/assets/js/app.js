// vim: set ts=4 sw=4:

import { FeedList } from './feedlist.js';

function setupApp() {
    FeedList.load();
    FeedList.update();
}

export { setupApp };
