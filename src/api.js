var sizes = {};

$.extend(Breakpoints, {
    define: function(breakpoints) {
        if(!breakpoints) {
            breakpoints = Breakpoints.defaults;
        }

        sizes = {};

        for(var size in breakpoints){
            this.set(size, breakpoints[size].min, breakpoints[size].max);
        }
    },

    is: function(size) {
        var breakpoint = this.get(size);
        if(!breakpoint) {
            return null;
        }

        return breakpoint.isMatched();
    },

    /* get all sizes */
    all: function() {
        return sizes;
    },

    set: function(name, min, max) {
        sizes[name] = new Size(name, min || null, max || null);
    },

    get: function(size){
        if(size in sizes){
            return sizes[size];
        }
        return null;
    },

    getMin: function(size) {
        var breakpoint = this.get(size);
        if(breakpoint){
            return breakpoint.min;
        }
        return null;
    },

    getMax: function(size) {
        var breakpoint = this.get(size);
        if(breakpoint){
            return breakpoint.max;
        }
        return null;
    },

    current: function() {
        var matches = [];
        $.each(sizes, function(size, breakpoint){
            if(breakpoint.isMatched()){
                matches.push(breakpoint);
            }
        });

        if(matches.length === 0){
            return false;
        } else if(matches.length === 1){
            return matches[0];
        } else {
            return matches;
        }
    },

    getMedia: function(size){
        var breakpoint = this.get(size);
        if(breakpoint){
            return breakpoint.media;
        }
        return null;
    },

    on: function(sizes, types, data, fn, /*INTERNAL*/ one) {
        var size = this.get(sizes);

        if(size) {
            size.on(types, data, fn, one);
        }
        return this;
    },

    one: function(sizes, types, data, fn) {
        return this.on( sizes, types, data, fn, 1 );
    },

    off: function(sizes, types, fn) {
        var size = this.get(sizes);

        if(size) {
            size.off(types, fn);
        }
        return this;
    },
    
    change: function(fn){

    }
});