var MediaBuilder = Breakpoints.mediaBuilder = {
    min: function (min) {
        return '(min-width: ' + min + 'px)';
    },
    max: function (max) {
        return '(max-width: ' + max + 'px)';
    },
    between: function (min, max) {
        return '(min-width: ' + min + 'px) and (max-width: ' + max + 'px)';
    },
    get: function(min, max){
        if(min === 0) {
            return this.max(max);
        }
        if(max === Infinity) {
            return this.min(min);
        }
        return this.between(min, max);
    }
};