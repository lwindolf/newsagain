// vim: set ts=4 sw=4:

// Create a modal dialog lightbox
//
// - Supports only one dialog at a time
// - Triggers callback on input[type="submit"]
//   returning map of all input field values
//   closing the dialog when callback returns
//   true
// - Allows updating the dialog with new values

class Dialog {
    #callback;
    #template;

    // listener function
    #onclickFunc;

    // Build a modal dialog from a Handlebars template
    constructor(template, data, callback) {
        this.#template = template;
        this.#callback = callback;

        document.getElementById('modal').style.display = 'block';
        document.getElementById('modalContent').innerHTML = template(data);
        document.addEventListener('click', this.#onclickFunc = (e) => {
            this.#onclick(e);
        });
    }

    // handle close and submit clicks
    #onclick(e) {
        if(e.target.closest('.close') || e.target.id === 'modal') {
            this.destroy();
            e.preventDefault();
            return;
        }

        if(e.target.closest('input[type="submit"]')) {
            var inputData = {};

            [...document.querySelectorAll('#modalContent input, #modalContent select, #modalContent textarea')]
                .forEach((e) => (inputData[e.name] = e.value));

            if(this.#callback(inputData))
                this.update(inputData);

            e.preventDefault();
            return;
        }
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
    }
}

export { Dialog };