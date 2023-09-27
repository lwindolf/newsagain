// vim: set ts=4 sw=4:

import { FeedUpdater } from './feedupdater.js';

function setupApp() {
    FeedUpdater.fetch('https://lzone.de/feed/devops.xml').then((f) => {
        console.log(f);
        document.body.innerHTML += `
            <h1>${f.title}</h1>
            ${
                f.items.map(i => `<div>${
                        new Intl.DateTimeFormat(
                            'en-GB',
                            {
                                dateStyle: 'short',
                                timeStyle: 'short',
                                timeZone: 'GMT'
                            }
                        ).format(i.time*1000)
                } <a href="${i.source}">${i.title}</a></div>`).join(' ')
            }
        `;
    })
}

export { setupApp };
