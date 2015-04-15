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
        Breakpoints.define.apply(this, arguments);
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

    var mediaQuery = Breakpoints.mediaQuery = {
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

    var Breakpoint = function(){
        return this.initialize.apply(this, Array.prototype.slice.call(arguments));
    }

    $.extend(Breakpoint.prototype, {
        listeners: {
            enter:[],
            leave:[]
        },
        initialize: function(name, min, max) {
            this.name = name;
            this.min = min? min: 0;
            this.max = max? max: Infinity;
            this.media = mediaQuery.get(this.min, this.max);
            this.mql =  (window.matchMedia && window.matchMedia(this.media)) || {
                matches         : false,
                media           : this.media,
                addListener     : function() {},
                removeListener  : function() {}
            };
            this.mql.addListener(this._handleListener);
        },

        on: function(types, data, fn, /*INTERNAL*/ one){

            return this;
        },

        one: function(types, data, fn){

            return this;
        },

        off: function(types, fn){
            return this;
        },

        match: function(){
            return this.mql.matches;
        },

        _handleListener: function(){

        }
    });

    var listeners = {};
    var sizes = {};

    $.extend(Breakpoints, {
        define: function(breakpoints) {
            if(!breakpoints) {
                breakpoints = Breakpoints.defaults;
            }

            sizes = {};
            $.each(breakpoints, function(name, value){
                sizes[name] = new Breakpoint(name, value.min || null, value.max || null);
            });
        },

        is: function(size) {
            var breakpoint = this.get(size);
            if(!breakpoint) {
                return null;
            }

            return breakpoint.match();
        },

        /* get all sizes */
        all: function() {
            return sizes;
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
                if(breakpoint.match()){
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
            var type;
        },

        one: function(sizes, types, data, fn) {
            return this.on( sizes, types, data, fn, 1 );
        },

        off: function(sizes, types, fn) {

        },
        
        change: function(fn){

        }
    });
})(jQuery, document, window);