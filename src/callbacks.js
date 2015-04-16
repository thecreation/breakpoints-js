var Callbacks = function () {
    var list = [];

    return {
        length: 0,
        add: function (fn, data, one) {
            this.push({
                fn: fn,
                data: data || {},
                one: one || 0
            });
            
            this.length ++;
        },
        remove: function(fn) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].fn === fn) {
                    list.splice(i, 1);
                    this.length --;
                    i--;
                }
            }
        },
        clear: function() {
            list = [];
            this.length = 0;
        },
        fire: function (i) {
            if(!i) {
                i = this.length - 1;
            }
            var callback = list[i];
            if ($.isFunction(callback.fn)) {
                    callback.fn.call(caller || window, callback.data);	
            }
            if(callback.one){
                delete list[i];
                this.length --;
            }
        },
        process: function (caller) {
            var callback, deletes = [];

            for(var i in list){
                this.fire(i); 
            }
        }
    };
};