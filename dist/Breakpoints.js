/*! Breakpoints.js - v0.2.0 - 2015-04-17
 * https://github.com/amazingSurge/breakpoints.js
 * Copyright (c) 2015 amazingSurge; Licensed GPL */
(function(document, window, undefined) {
    "use strict";

    var Breakpoints = window.Breakpoints = function() {
        Breakpoints.define.apply(Breakpoints, arguments);
    };

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
    Breakpoints.defaults = {
        // Extra small devices (phones)
        xs: {
            min: 0,
            max: 767
        },
        // Small devices (tablets
        sm: {
            min: 768,
            max: 991
        },
        // Medium devices (desktops)
        md: {
            min: 992,
            max: 1199,
        },
        // Large devices (large desktops)
        lg: {
            min: 1200,
            max: Infinity
        }
    };
    var MediaBuilder = Breakpoints.mediaBuilder = {
        min: function(min) {
            return '(min-width: ' + min + 'px)';
        },
        max: function(max) {
            return '(max-width: ' + max + 'px)';
        },
        between: function(min, max) {
            return '(min-width: ' + min + 'px) and (max-width: ' + max + 'px)';
        },
        get: function(min, max) {
            if (min === 0) {
                return this.max(max);
            }
            if (max === Infinity) {
                return this.min(min);
            }
            return this.between(min, max);
        }
    };
    var Callbacks = function() {
        var list = [];

        return {
            length: 0,
            add: function(fn, data, one) {
                list.push({
                    fn: fn,
                    data: data || {},
                    one: one || 0
                });

                this.length++;
            },
            remove: function(fn) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].fn === fn) {
                        list.splice(i, 1);
                        this.length--;
                        i--;
                    }
                }
            },
            clear: function() {
                list = [];
                this.length = 0;
            },
            fire: function(i, caller) {
                if (!i) {
                    i = this.length - 1;
                }
                var callback = list[i];
                if (isFunction(callback.fn)) {
                    callback.fn.call(caller || window, callback.data);
                }
                if (callback.one) {
                    delete list[i];
                    this.length--;
                }
            },
            process: function(caller) {
                var callback, deletes = [];

                for (var i in list) {
                    this.fire(i, caller);
                }
            }
        };
    };
    var MediaQuery = Breakpoints.mediaQuery = function(name, media) {
        this.name = name;
        this.media = media;

        return this.initialize.apply(this);
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

                self.callbacks[type].process(self);
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
                    this.callbacks[types].fire();
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
                this.callbacks.enter.clear();
                this.callbacks.leave.clear();
            }
            if (types in this.callbacks) {
                if (fn) {
                    this.callbacks[types].remove(fn);
                } else {
                    this.callbacks[types].clear();
                }
            }

            return this;
        },

        isMatched: function() {
            return this.mql.matches;
        }
    };
    var Size = function(name, min, max) {
        this.name = name;
        this.min = min ? min : 0;
        this.max = max ? max : Infinity;

        this.media = MediaBuilder.get(this.min, this.max);

        this.initialize.apply(this);

        var self = this;
        this.changeListener = function(mql) {
            $(window).trigger('sizeChange.breakpoints', self);
        };
        this.mql.addListener(this.changeListener);
    }


    Size.prototype = MediaQuery.prototype;
    Size.prototype.constructor = Size;

    extend(Size.prototype, {
        destory: function() {
            this.off();
            this.mql.removeListener(this.changeHander);
        }
    });
    var sizes = {};

    $.extend(Breakpoints, {
        define: function(breakpoints) {
            if (!breakpoints) {
                breakpoints = Breakpoints.defaults;
            }

            sizes = {};

            for (var size in breakpoints) {
                this.set(size, breakpoints[size].min, breakpoints[size].max);
            }
        },

        is: function(size) {
            var breakpoint = this.get(size);
            if (!breakpoint) {
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

        get: function(size) {
            if (size in sizes) {
                return sizes[size];
            }
            return null;
        },

        getMin: function(size) {
            var breakpoint = this.get(size);
            if (breakpoint) {
                return breakpoint.min;
            }
            return null;
        },

        getMax: function(size) {
            var breakpoint = this.get(size);
            if (breakpoint) {
                return breakpoint.max;
            }
            return null;
        },

        current: function() {
            var matches = [];
            each(sizes, function(size, breakpoint) {
                if (breakpoint.isMatched()) {
                    matches.push(breakpoint);
                }
            });

            if (matches.length === 0) {
                return false;
            } else if (matches.length === 1) {
                return matches[0];
            } else {
                return matches;
            }
        },

        getMedia: function(size) {
            var breakpoint = this.get(size);
            if (breakpoint) {
                return breakpoint.media;
            }
            return null;
        },

        on: function(sizes, types, data, fn, /*INTERNAL*/ one) {
            var size = this.get(sizes);

            if (size) {
                size.on(types, data, fn, one);
            }
            return this;
        },

        one: function(sizes, types, data, fn) {
            return this.on(sizes, types, data, fn, 1);
        },

        off: function(sizes, types, fn) {
            var size = this.get(sizes);

            if (size) {
                size.off(types, fn);
            }
            return this;
        },

        change: function(fn) {

        }
    });
})(document, window);
