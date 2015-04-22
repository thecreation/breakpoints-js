var sizes = {};
var unionSizes = {};


Breakpoints = extend(Breakpoints, {
    defined: false,
    define: function(values, options) {
        if (this.defined) {
            this.destory();
        }

        if (!values) {
            values = Breakpoints.defaults;
        }

        this.options = extend(options || {}, {
            unit: 'px'
        });

        for (var size in values) {
            this.set(size, values[size].min, values[size].max, this.options.unit);
        }

        this.defined = true;
    },

    destory: function() {
        each(sizes, function(name, size) {
            size.destory();
        });
        sizes = {};
        ChangeEvent.current = null;
    },

    is: function(size) {
        var breakpoint = this.get(size);
        if (!breakpoint) {
            return null;
        }

        return breakpoint.isMatched();
    },

    /* get all size name */
    all: function() {
        var names = [];
        each(sizes, function(name) {
            names.push(name);
        });
        return names;
    },

    set: function(name, min, max, unit) {
        var size = this.get(name);
        if (size) {
            size.destory();
        }

        sizes[name] = new Size(name, min || null, max || null, unit || null)
        return sizes[name];
    },

    get: function(size) {
        if (sizes.hasOwnProperty(size)) {
            return sizes[size];
        }

        return null;
    },

    getUnion: function(sizes) {
        if(unionSizes.hasOwnProperty(sizes)) {
            return unionSizes[sizes];
        }

        unionSizes[sizes] = new UnionSize(sizes)

        return unionSizes[sizes];
    },

    getMin: function(size) {
        var obj = this.get(size);
        if (obj) {
            return obj.min;
        }
        return null;
    },

    getMax: function(size) {
        var obj = this.get(size);
        if (obj) {
            return obj.max;
        }
        return null;
    },

    current: function() {
        return ChangeEvent.current;
    },

    getMedia: function(size) {
        var obj = this.get(size);
        if (obj) {
            return obj.media;
        }
        return null;
    },

    on: function(sizes, types, data, fn, /*INTERNAL*/ one) {
        if (sizes === 'change') {
            fn = data;
            data = types;
            return ChangeEvent.on(data, fn, one);
        }
        if(sizes.indexOf(' ')){
            var union = this.getUnion(sizes);

            if (union) {
               union.on(types, data, fn, one); 
            }
        } else {
            var size = this.get(sizes);

            if (size) {
                size.on(types, data, fn, one);
            }
        }
        
        return this;
    },

    one: function(sizes, types, data, fn) {
        return this.on(sizes, types, data, fn, 1);
    },

    off: function(sizes, types, fn) {
        if (sizes === 'change') {
            return ChangeEvent.off(types);
        }

        if(sizes.indexOf(' ')){
            var union = this.getUnion(sizes);

            if (union) {
               union.off(types, fn); 
            }
        } else {
            var size = this.get(sizes);

            if (size) {
                size.off(types, fn);
            }
        }

        return this;
    }
});
