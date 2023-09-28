// vim: set ts=4 sw=4:

// Very simple layout manager with 2 supported layouts
//
// layout #1: 3 vertical panes always visible (desktop)
// layout #2: 1 vertical pane (mobile)
//
// For now simple naive implementation switching between
// both layouts at a threshold width

class Layout {
        static update() {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            let theme = document.getElementById('theme');

            if (isMobile || window.innerWidth < 800)
                    theme.setAttribute('href', 'assets/css/mobile.css');
            else
                    theme.setAttribute('href', 'assets/css/desktop.css');
        }

        // switch view (needed only on mobile)
        static view(name) {
            //let e = document.getElementsById(name);
            console.log("FIXME visible "+name);
        }
}

export { Layout };
