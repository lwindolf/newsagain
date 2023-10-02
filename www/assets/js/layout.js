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
import { debounce } from './helpers/debounce.js';

class Layout {
    static isSmall;
    static split;

    static update() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        let theme = document.getElementById('theme');
        let before = Layout.isSmall;

        Layout.isSmall = (isMobile || window.innerWidth < 800);
        if(before === Layout.isSmall)
            return;

        if(Layout.isSmall) {
            theme.setAttribute('href', 'assets/css/mobile.css');
            Layout.isSmall = true
            Layout.view('feedlist');

            if(Layout.split)
                Layout.split.destroy();
        } else {
            theme.setAttribute('href', 'assets/css/desktop.css');
            Layout.isSmall = false;

            // show all views (desktop)
            [...document.querySelectorAll('.view')]
                .forEach(e => (e.style.display = 'block'));

            // setup split panes
            Layout.split = Split(['#feedlist', '#itemlist', '#item'], {
                sizes: [20, 30, 50],
                minSize: [10, 10, 10],
                gutterSize: 6,
                expandToMin: true
            });
        }
    }

    // switch view (needed only on mobile)
    static view(name) {
        if(!Layout.isSmall)
            return;

        [...document.querySelectorAll('.view')]
            .forEach(e => (e.style.display = 'none'));

        document.getElementById(name).style.display = 'block';
    }

    static setup() {
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

        Layout.update();

    }
}

export { Layout };
