// vim: set ts=4 sw=4:

// Feed info rendering widget, can appear in two places
//
// - single pane layout: as an error box on top of the item list
// - 3 pane layout: in the item view

import { FeedList } from './feedlist.js';
import { template, render } from './helpers/render.js';

export class FeedInfo {
    static #errorTemplate = template(`
        {{#if feed.error}}
            <div class='feedInfoErrorBox'>
            ERROR ({{feed.error}}) while feed fetch (<a href='{{feed.source}}'>{{feed.source}}</a>)!
            </div>
        {{/if}}
    `);
    static #contentTemplate = template(`
        <h1 id='itemViewContentTitle'>
            <a target='_system' href='{{feed.homepage}}'>{{feed.title}}</a>
        </h1>
    
        <p>{{{feed.description}}}</p>

        <div class='feedInfoError'></div>
    `);

    // load content of a single item
    static #render(id) {
        let feed = FeedList.getNodeById(id);

        render('#itemViewContent', FeedInfo.#contentTemplate, { feed });
        render('.feedInfoError', FeedInfo.#errorTemplate, { feed })
    }

    static setup() {
        document.addEventListener('feedSelected', (e) => {
            FeedInfo.#render(e.detail.id);
        });
    }
}