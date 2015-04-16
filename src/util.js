function isPercentage(n) {
    return typeof n === 'string' && n.indexOf('%') != -1;
}

function isPx(n) {
    return typeof n === 'string' && n.indexOf('px') != -1;
}

function convertMatrixToArray(value) {
    if (value && (value.substr(0, 6) == "matrix")) {
        return value.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, '').split(/, +/);
    }
    return false;
}

function getHashCode(object) {
    if (typeof object !== 'string') {
        object = JSON.stringify(object);
    }

    var hash = 0,
        i, chr, len;
    if (object.length == 0) return hash;
    for (i = 0, len = object.length; i < len; i++) {
        chr = object.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
}
