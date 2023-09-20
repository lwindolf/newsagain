// vim: set ts=4 sw=4:

import { FeedUpdater } from './feedupdater.js';

function setupApp() {
    FeedUpdater.fetch('https://lzone.de/feed/devops.xml').then((f) => {
        console.log(f);
    })
}

export { setupApp };
