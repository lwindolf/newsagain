// vim: set ts=4 sw=4:

import { Feed } from "../www/assets/js/feed";
import { Favicon } from "../www/assets/js/parsers/favicon";

global['fetch'] = jest.fn().mockImplementation(() =>
    Promise.resolve({
        text: () => Promise.resolve(`<!DOCTYPE html>
        <html lang="en-us">
        
        <head>
            <title>Ars Technica</title>
            <link rel="shortcut icon" href="https://cdn.arstechnica.net/favicon.ico" />
            <link rel="icon" type="image/x-icon" href="https://cdn.arstechnica.net/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="https://cdn.arstechnica.net/wp-content/themes/ars/assets/img/ars-ios-icon-d9a45f558c.png" />
            <link rel="mask-icon" href="https://cdn.arstechnica.net/wp-content/themes/ars/assets/img/ars-macos-safari-8997f76b21.svg" color="#ff4e00">
            <link rel="icon" sizes="192x192" href="https://cdn.arstechnica.net/wp-content/themes/ars/assets/img/material-ars-db41652381.png" />
        </head>
        <body>
            <p>content</p>
        </body>
        </html>
        `),
    })
);

test("Large Icon", async () => {
        let icon = await Favicon.discover("https://arstechnica.com");
        
        expect(icon).toBe('https://cdn.arstechnica.net/wp-content/themes/ars/assets/img/material-ars-db41652381.png');
});


global['fetch'] = jest.fn().mockImplementation(() =>
    Promise.resolve({
        text: () => Promise.resolve(`<!DOCTYPE html>
        <html lang="en-us">
        
        <head>
            <title>Ars Technica</title>
        </head>
        <body>
            <p>content</p>
        </body>
        </html>
        `),
    })
);

test("Default to favicon.ico", async () => {
    let icon = await Favicon.discover("https://arstechnica.com");
    
    expect(icon).toBe('https://arstechnica.com/favicon.ico');
});