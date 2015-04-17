var ChangeEvent = {
    target: null,
    callbacks: new Callbacks(),
    trigger: function(size) {
        var self = this;
        this.callbacks.fire(size, function(caller, callback) {
            if (isFunction(callback.fn)) {
                callback.fn.call({
                    current: size,
                    previous: self.target
                }, callback.data);
            }
        });
        this.target = size;
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
