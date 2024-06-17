// vim: set ts=4 sw=4:

// Create a modal dialog lightbox
//
// - Supports only one dialog at a time
// - Triggers callback on input[type="submit"]
//   returning map of all input field values
//   closing the dialog when callback returns
//   true
// - Allows updating the dialog with new values

import { template } from '../helpers/render.js';

class Dialog {
    #callback;
    #template;

    // listener function
    #onclickFunc;
    #onsubmitFunc;
    #onkeydownFunc;

    // Build a modal dialog from a Handlebars template
    constructor(templateStr, data, callback) {
        this.#template = template(templateStr);
        this.#callback = callback;

        document.getElementById('modal').style.display = 'block';
        document.getElementById('modalContent').innerHTML = '<form>'+this.#template(data)+'</form>';
        document.addEventListener('click', this.#onclickFunc = (e) => {
            this.#onclick(e);
        });
        document.addEventListener('submit', this.#onsubmitFunc = (e) => {
            this.#onsubmit(e);
        });
        document.addEventListener('keydown', this.#onkeydownFunc = (e) => {
            if(e.code === "Escape")
                this.destroy();
        });
    }

    // handle close and submit clicks
    #onclick(e) {
        if(e.target.closest('.close') || e.target.id === 'modal') {
            this.destroy();
            e.preventDefault();
            return;
        }
    }

    #onsubmit(e) {
        var inputData = {};

        [...document.querySelectorAll('#modalContent input, #modalContent select, #modalContent textarea')]
            .forEach((e) => (inputData[e.name] = e.value));

        this.#callback(inputData).then((done) => {
            if(done)
                this.destroy();
        });

        e.preventDefault();
        return;
    }

    // Update the dialog with new data, along with a conditional 
    // template this allows changing the dialog and supplying new 
    // data & fields.
    update(data) {
        document.getElementById('modalContent').innerHTML = this.#template(data);
    }

    // "destructor"
    destroy() {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('modalContent').innerHTML = '';
        document.removeEventListener('click', this.#onclickFunc);
        document.removeEventListener('submit', this.#onsubmitFunc);
        document.removeEventListener('keydown', this.#onkeydownFunc);
    }
}

export { Dialog };