// vim: set ts=4 sw=4:

// Very simple layout manager with 2 supported layouts
//
// layout #1: 3 vertical panes always visible (desktop)
// layout #2: 1 vertical pane (mobile)
//
// For now simple naive implementation switching between
// both layouts at a threshold width as well as user agents
// triggering it

class Layout {
    static isSmall;

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
        } else {
            theme.setAttribute('href', 'assets/css/desktop.css');
            Layout.isSmall = false;

            // show all views (desktop)
            [...document.querySelectorAll('.view')]
                .forEach(e => (e.style.display = 'block'));
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
}

export { Layout };
