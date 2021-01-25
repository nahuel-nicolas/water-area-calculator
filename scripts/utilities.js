function removeClass(element, classes) {
    for (const className of classes) {
        element.classList.remove(className);
    }
}

function addClass(element, classes) {
    for (const className of classes) {
        element.classList.add(className);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { removeClass, addClass, sleep };