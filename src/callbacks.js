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
        empty: function() {
            list = [];
            this.length = 0;
        },
        call: function(caller, i, fn) {
            if (!i) {
                i = this.length - 1;
            }
            var callback = list[i];

            if (isFunction(fn)) {
                fn.call(this, caller, callback, i);
            } else {
                if (isFunction(callback.fn)) {
                    callback.fn.call(caller || window, callback.data);
                }
            }

            if (callback.one) {
                delete list[i];
                this.length--;
            }
        },
        fire: function(caller, fn) {
            for (var i in list) {
                this.call(caller, i, fn);
            }
        }
    };
};
