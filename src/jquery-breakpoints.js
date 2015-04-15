/*
 * jquery-breakpoints
 * https://github.com/amazingSurge/jquery-breakpoints
 *
 * Copyright (c) 2015 amazingSurge
 * Licensed under the MIT license.
 */
(function($, document, window, undefined) {
    "use strict";

    var Breakpoints = $.breakpoints = function() {
        Breakpoints.define.apply(Breakpoints, arguments);
    };

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

    var Listeners = function () {
        var list = [];

        return {
            length: 0,
            add: function (callback, data, one) {
                this.push({
                    callback: callback,
                    data: data || {},
                    one: one || 0
                });
                
                this.length ++;
            },
            remove: function(callback) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].callback === callback) {
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
                var listener = list[i];
                if ($.isFunction(listener.callback)) {
                        listener.callback.call(caller || window, listener.data);	
                }
                if(listener.one){
                    delete list[i];
                    this.length --;
                }
            },
            process: function (caller) {
                var listener, deletes = [];

                for(var i in list){
                    this.fire(i); 
                }
            }
        };
    };

    var MediaQuery = Breakpoints.mediaQuery = function(name, media){
        this.name = name;
        this.media = media;

        return this.initialize.apply(this);
    }

    $.extend(MediaQuery.prototype, {
        initialize: function(){
            this.listeners = {
                enter: new Listeners(),
                leave: new Listeners()
            };

            this.mql =  (window.matchMedia && window.matchMedia(this.media)) || {
                matches         : false,
                media           : this.media,
                addListener     : function() {},
                removeListener  : function() {}
            };

            var self = this;
            this.mqlHandler = function(mql){
                var type  = (mql.matches && 'enter') || 'leave';

                self.listeners[type].process(self);
            };
            this.mql.addListener(this.mqlHandler);
        },

        on: function(types, data, callback, /*INTERNAL*/ one){
            var type;
            if ( typeof types === "object" ) {
                for ( type in types ) {
                    this.on( type, data, types[ type ], one );
                }
                return this;
            }

            if( callback == null && $.isFunction(data) ){
                callback = data;
                data = undefined;
            }

            if (!$.isFunction(callback)) {
                return this;
            }

            if(types in this.listeners){
                this.listeners[types].add(callback, data, one);
                if(this.isMatched() && types === 'enter') {
                    this.listeners[types].fire();
               }
            }

            return this;
        },

        one: function(types, data, callback){
            return this.on( types, data, callback, 1 );
        },

        off: function(types, callback){
            var type;
            if ( typeof types === "object" ) {
                for ( type in types ) {
                    this.off( type, types[ type ] );
                }
                return this;
            }

            if(types == null){
                this.listeners.enter.clear();
                this.listeners.leave.clear();
            }
            if(types in this.listeners){
                if(callback){
                    this.listeners[types].remove(callback);
                } else {
                    this.listeners[types].clear();
                }
            }
            
            return this;
        },

        isMatched: function(){
            return this.mql.matches;
        }
    });

    var Size = function(name, min, max){
        this.name = name;
        this.min = min? min: 0;
        this.max = max? max: Infinity;

        this.media = MediaBuilder.get(this.min, this.max);

        this.initialize.apply(this);
      
        var self = this;
        this.changeHandler = function(mql){
        $(window).trigger('sizeChange.breakpoints', self);
    };
        this.mql.addListener(this.changeHandler);
    }

    Size.prototype = $.extend({}, MediaQuery.prototype, Size.prototype, {
        destory: function(){
            this.off();
            this.mql.removeListener(this.changeHander);
        }
    });

    var sizes = {};


    var parseSizes = function(string) {

    };

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

        on: function(sizes, types, data, callback, /*INTERNAL*/ one) {
            var size = this.get(sizes);

            if(size) {
                size.on(types, data, callback, one);
            }
            return this;
        },

        one: function(sizes, types, data, callback) {
            return this.on( sizes, types, data, callback, 1 );
        },

        off: function(sizes, types, callback) {
            var size = this.get(sizes);

            if(size) {
                size.off(types, callback);
            }
            return this;
        },
        
        change: function(callback){

        }
    });
})(jQuery, document, window);