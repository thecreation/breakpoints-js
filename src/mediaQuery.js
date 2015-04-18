var MediaQuery = Breakpoints.mediaQuery = function(name, media) {
    this.name = name;
    this.media = media;

    this.initialize.apply(this);
}

MediaQuery.prototype = {
    constructor: MediaQuery,
    initialize: function() {
        this.callbacks = {
            enter: new Callbacks(),
            leave: new Callbacks()
        };

        this.mql = (window.matchMedia && window.matchMedia(this.media)) || {
            matches: false,
            media: this.media,
            addListener: function() {},
            removeListener: function() {}
        };

        var self = this;
        this.mqlListener = function(mql) {
            var type = (mql.matches && 'enter') || 'leave';

            self.callbacks[type].fire(self);
        };
        this.mql.addListener(this.mqlListener);
    },

    on: function(types, data, fn, /*INTERNAL*/ one) {
        var type;
        if (typeof types === "object") {
            for (type in types) {
                this.on(type, data, types[type], one);
            }
            return this;
        }

        if (fn == null && isFunction(data)) {
            fn = data;
            data = undefined;
        }

        if (!isFunction(fn)) {
            return this;
        }

        if (types in this.callbacks) {
            this.callbacks[types].add(fn, data, one);
            if (this.isMatched() && types === 'enter') {
                this.callbacks[types].call(this);
            }
        }

        return this;
    },

    one: function(types, data, fn) {
        return this.on(types, data, fn, 1);
    },

    off: function(types, fn) {
        var type;
        if (typeof types === "object") {
            for (type in types) {
                this.off(type, types[type]);
            }
            return this;
        }

        if (types == null) {
            this.callbacks.enter.empty();
            this.callbacks.leave.empty();
        }
        if (types in this.callbacks) {
            if (fn) {
                this.callbacks[types].remove(fn);
            } else {
                this.callbacks[types].empty();
            }
        }

        return this;
    },

    isMatched: function() {
        return this.mql.matches;
    },

    destory: function() {
        this.off();
    }
};