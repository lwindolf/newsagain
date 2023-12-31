// vim: set ts=4 sw=4:

// Basic subscription dialog (just a URL entry)

import { Feed } from '../feed.js';
import { FeedList } from '../feedlist.js';
import { Dialog } from '../helpers/dialog.js';
import { linkAutoDiscover } from '../parsers/autodiscover.js';

class SimpleSubscriptionDialog extends Dialog {
    constructor() {
        let d = super(`
            <h2>Add new subscription</h2>
            <input name='url' type='text' autofocus placeholder='Website or feed URL'/>
            <input type='submit' value='Add'/>

            {{#if error}}
            <div>Error: {{error}}</div>
            {{/if}}
        `,
        { /* no initial data */ },
        async (result) => {
            let links = await linkAutoDiscover(result.url);

            // FIXME: let user choose which feed to use
            if(links.length > 0) {
                FeedList.add(new Feed({
                    title: 'New Feed',
                    id: FeedList.maxId + 1,
                    source: links[0]
                }));
                return true;
            }

            result['error'] = 'Feed auto discovery failed!'
            d.update(result);
            return false;
        });
    }
}

export { SimpleSubscriptionDialog };