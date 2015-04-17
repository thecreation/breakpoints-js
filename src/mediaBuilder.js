var MediaBuilder = Breakpoints.mediaBuilder = {
    min: function(min, unit) {
        return '(min-width: ' + min + unit + ')';
    },
    max: function(max, unit) {
        return '(max-width: ' + max + unit + ')';
    },
    between: function(min, max, unit) {
        return '(min-width: ' + min + unit + ') and (max-width: ' + max + unit + ')';
    },
    get: function(min, max, unit) {
        if (!unit) {
            unit = 'px';
        }
        if (min === 0) {
            return this.max(max, unit);
        }
        if (max === Infinity) {
            return this.min(min, unit);
        }
        return this.between(min, max, unit);
    }
};
