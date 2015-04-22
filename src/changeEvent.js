var ChangeEvent = {
    current: null,
    callbacks: new Callbacks(),
    trigger: function(size) {
        var previous = this.current;
        this.current = size;
        this.callbacks.fire(size, function(caller, callback) {
            if (isFunction(callback.fn)) {
                callback.fn.call({
                    current: size,
                    previous: previous
                }, callback.data);
            }
        });
    },
    one: function(data, fn) {
        return this.on(data, fn, 1);
    },
    on: function(data, fn, /*INTERNAL*/ one) {
        if (fn == null && isFunction(data)) {
            fn = data;
            data = undefined;
        }
        if (!isFunction(fn)) {
            return this;
        }
        this.callbacks.add(fn, data, one);
    },
    off: function(fn) {
        if (fn == null) {
            this.callbacks.empty();
        }
    }
};
