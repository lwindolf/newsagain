// vim: set ts=4 sw=4:

// Very simple layout manager with 2 supported layouts
//
// layout #1: 3 vertical panes always visible (desktop)
// layout #2: 1 vertical pane (mobile)
//
// For now simple naive implementation switching between
// both layouts at a threshold width as well as user agents
// triggering it

import Split from './lib/split.es.js';
import { ItemList } from './itemlist.js';
import { debounce } from './helpers/debounce.js';
import { HeaderView } from './header.js';

export class Layout {
    // state
    static #isSmall;
    static #split;
    static #view;
    static #touchStart;
    static #isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    static isMobile = () => Layout.#isMobile;

    static update() {
        let theme = document.getElementById('theme');
        let before = Layout.#isSmall;

        Layout.#isSmall = (Layout.#isMobile || window.innerWidth < 800);
        if(before === Layout.#isSmall)
            return;

        if(Layout.#isSmall) {
            theme.setAttribute('href', 'assets/css/mobile.css');
            Layout.#isSmall = true
            Layout.view('feedlist');

            if(Layout.#split)
                Layout.#split.destroy();
        } else {
            theme.setAttribute('href', 'assets/css/desktop.css');
            Layout.#isSmall = false;

            // show all views (desktop)
            [...document.querySelectorAll('.view')]
                .forEach(e => (e.style.display = 'block'));

            // setup split panes
            Layout.#split = Split(['#feedlist', '#itemlist', '#item'], {
                sizes: [20, 30, 50],
                minSize: [10, 10, 10],
                gutterSize: 6,
                expandToMin: true
            });
        }
    }

    // switch view (mobile only)
    static view(name) {
        if(!Layout.#isSmall)
            return;

        Layout.#view = name;

        [...document.querySelectorAll('.view')]
            .forEach(e => (e.style.display = 'none'));

        document.getElementById(name).style.display = 'block';

        HeaderView.update(name);
    }

    // switch to previous view (mobile only)
    static back() {
        if(!Layout.#isSmall)
            return;

        if(Layout.#view === 'itemlist') {
            Layout.view('feedlist');
            return;
        }
        if(Layout.#view === 'item') {
            Layout.view('itemlist');
            return;
        }
    }

    static forward() {
        if(!Layout.#isSmall)
            return;

        if(Layout.#view === 'item') {
            ItemList.nextUnread();
            return;
        }
    }

    constructor() {
        window.onresize = debounce(function() {
            Layout.update();
        }, 100);

        // disable Electron menubar hotkeys
        window.addEventListener('keydown', function(e) {
            if ((e.code === 'AltRight') || (e.code === 'AltLeft')) {
                e.preventDefault();
            }
        });

        document.addEventListener('itemSelected', () => Layout.view('item'));
        document.addEventListener('feedSelected', () => Layout.view('itemlist'));
        document.addEventListener('click', (e) => {
            let n = e.target.closest('.switchView');
            if(n) {
                Layout.view(n.dataset.view);
                e.preventDefault();
            }
        });

        // Touch swiping 
        document.addEventListener('touchstart', (e) => {
            Layout.#touchStart = e.touches[0];
        }, {
            passive: true
        })
        document.addEventListener('touchmove', (e) => {
            if(!Layout.#touchStart)
                return;

            let diff = Layout.#touchStart.clientX - e.touches[0].clientX;
            if (Math.abs(diff) > 10) { // FIXME: make 10 a window width percentage
                if (diff < 0)
                    Layout.back();
                else
                    Layout.forward();
            }

            Layout.#touchStart = null;
        }, {
            capture: true,
            passive: false,
        })

        Layout.update();
    }
}