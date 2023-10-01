// vim: set ts=4 sw=4:

function template(str) {
    let h = window.Handlebars;
    if(!h)
        return undefined;   // for tests only

    return h.compile(str);
}

function render(selector, template, params, append = false) {
    let e = document.querySelector(selector);
    let result;

    if(!e)
        return;

    try {
        result = template(params);
    } catch(e) {
        result = `Rendering exception: ${e}`;
    }
    
    if(append)
        e.innerHTML += result;
    else
        e.innerHTML = result;
}

export { template, render };