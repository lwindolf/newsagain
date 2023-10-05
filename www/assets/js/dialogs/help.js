// vim: set ts=4 sw=4:

// Simple hotkey + mouse usage help

import { Dialog } from '../helpers/dialog.js';

class HelpDialog extends Dialog {
    constructor() {
        super(`
            <h2>Help</h2>

            <h3>Keyboard</h3>

            <table>
                <tr>
                    <td>F1</td>
                    <td>Help</td>
                </tr>
                <tr>
                    <td>Ctrl - right arrow</td>
                    <td>Next Unread</td>
                </tr>
                <tr>
                    <td>Ctrl - S</td>
                    <td>Mark All Read</td>
                </tr>
                <tr>
                    <td>Ctrl - U</td>
                    <td>Update All</td>
                </tr>
            </table>

            <h3>Touch</h3>

            <table>
                <tr>
                    <td>Swipe Left</td>
                    <td>Back to Item / Feed List</td>
                </tr>
                <tr>
                    <td>Swipe Right</td>
                    <td>Next Unread</td>
                </tr>
            </table>
        `,
        { /* no data */ },
        async () => {
            return true;
        });
    }
}

export { HelpDialog };