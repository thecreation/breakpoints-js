function each(obj, fn) {
    var continues;

    for (var i in obj) {
        continues = fn(i, obj[i]);
        if (continues === false) {
            break; //allow early exit
        }
    }
}

function isFunction(obj) {
    return typeof obj == 'function' || false;
}

function extend(obj, source) {
    for (var property in source) {
        obj[property] = source[property];
    }
    return obj;
}
