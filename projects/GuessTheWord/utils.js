function autofocus(e) {
    let target = e.srcElement || e.target;
    let pressed = e.keyCode || e.which;

    let l = target.value.length;

    // if user pressed backspace
    if (pressed === 8) {
        if (l === 0) {
            let previous = target.previousElementSibling;
            while (previous) {
                if (previous.className === "guess") {
                    previous.focus();
                    break;
                }
                previous = previous.previousElementSibling;
            }
        }
        return;
    }

    if (l > 0) {
        let next = target.nextElementSibling;
        while (next) {
            if (next.className === "guess") {
                next.focus();
                break;
            }
            next = next.nextElementSibling;
        }
    }
}
