#[breakpoints.js](https://github.com/amazingSurge/breakpoints.js) ![bower][bower-image] [![devDependency status][devdeps-image]][devdeps-link]

`breakpoints.js` is a lightweight, pure javascript library for attaching callbacks to breakpoints. 

##Getting breakpoints.js

###Download

Get the latest build, ready to go:
 
 * [Development](https://raw.githubusercontent.com/amazingSurge/breakpoints.js/master/dist/breakpoints.js) - unminified
 * [Production](https://raw.githubusercontent.com/amazingSurge/breakpoints.js/master/dist/breakpoints.min.js) - minified

###Build From Source

If you want build from source:

    git clone git@github.com:amazingSurge/breakpoints.js.git
    cd breakpoints.js
    sudo npm install
    grunt

Done!

###Install From Bower

    bower install breakpoints.js

## Usage

Before you try anything, you need to include breakpoints.js in your page.

```html
<script src="breakpoints.min.js"></script>
```

You may need provide a matchMedia polyfill if you wish to [support old/incapable browsers](#browser-support).

Then you can init the script easily by code 
```javascript
<script type="text/javascript">
    Breakpoints();
</script>
```

It will use the bootstrap media query breakpoints by default:

```javascript
Breakpoints.defaults = {
    // Extra small devices (phones)
    xs: {
        min: 0,
        max: 767
    },
    // Small devices (tablets)
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
```

You can set up your own breakpoints when initialize it:

```javascript
<script type="text/javascript">
    Breakpoints({
        mobile: {
            min: 0,
            max: 767
        },
        tablet: {
            min: 768,
            max: 991
        },
        destop: {
            min: 992,
            max: Infinity
        }
    });
</script>
```

## API
### is

Check if the current screen is a specific size.

```javascript
Breakpoints.is('xs'); // return true or false
```

### get
Return the size object that you can operate it handily.

```javascript
// get size object
var sm = Breakpoints.get('sm');

// attach events
sm.on('enter', function(){
    // do something
});

// remove event handler
sm.off('enter');

// get min width
sm.min // 768

// get max width
sm.max // 991

// get media query
sm.media // "(min-width: 768px) and (max-width: 991px)"

// check if it's current size
sm.isMatched(); // true or false

// you can do in a chain
Breakpoints.get('sm').on({
    enter: function(){

    },
    leave: function(){

    }
});
```

### current
Return the current screen size object

```javascript
Breakpoints.current();
```

### on
Attach an event handler function for one or more events to the size

```javascript
Breakpoints.on('md', {
    enter: function() {
        console.info('enter '+ this.name);
    },
    leave: function() {
        console.info('leave '+ this.name);
    }
});

Breakpoints.on('lg', 'enter', function(){
    console.info('hello lg');
});
```

#### Passing data to the callback

```javascript
Breakpoints.on('sm', "enter", {
    name: "Addy"
}, function(data) {
    console.info(data.name + ' enter '+ this.name);
});

Breakpoints.on('sm', "leave", {
    name: "Karl"
}, function(data) {
    console.info(data.name + ' leave '+ this.name);
});
```

#### Unite sizes

```javascript
Breakpoints.on('md lg', {
    enter: function() {
        console.info('enter '+ this.name);
    },
    leave: function() {
        console.info('leave '+ this.name);
    }
});
```

### one
The handler attached to the size will executed at most once.

```javascript
Breakpoints.one('md', 'enter', function(){
    console.info('this only appear once when enter md');
});
```

### off
Remove event handlers attached to size.

```javascript
// remove all events attached to sm size
Breakpoints.off('sm');

// remove all enter type events attached to md size
Breakpoints.off('md', 'enter'); 

// remove specific event handler
var enterHandler = function(){};
Breakpoints.on('lg', 'enter', enterHandler);

Breakpoints.off('lg', {
    enter: enterHandler
})

// alternative way
Breakpoints.off('lg', 'enter', enterHandler);
```

### change
Attach an event handler to the size change event

```javascript
// attach handler to change event
Breakpoints.on('change', function(){
    console.info('enter ' + this.current.name);
});

// altrnative example
var changeHandler = function(){
    // do something 
};
Breakpoints.on('change', changeHandler);

// remove the handler
Breakpoints.off('change', changeHandler);

// remove all change handlers
Breakpoints.off('change');
```

## Bugs and feature requests

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md). Make sure you're using the latest version of breakpoints.js before submitting an issue.

* [Bug reports](CONTRIBUTING.md#bug-reports)
* [Feature requests](CONTRIBUTING.md#feature-requests)

## Browser Support

- [`matchMedia` browser support](http://caniuse.com/#search=matchMedia) work perfect on all modern browsers (IE10+, firefox, chrome, android and safari).
- With some polyfills (like the ones included in [matchMedia.js](https://github.com/paulirish/matchMedia.js/)) Breakpoints works perfect in IE6-9 as well.


## Other Projects

If you like this project then I encourage you to check out a few of my other hand-selected projects.

- [enquire.js](http://wicky.nillia.ms/enquire.js/) - A lightweight, pure JavaScript library for responding to CSS media queries.
- [mediaquery](http://formstone.it/components/mediaquery/) - A jQuery plugin for responsive media query events.
- [strapPoint](https://github.com/dannynimmo/strapPoint) - A small jQuery utility plugin to make working with Bootstrap breakpoints easier.
- [pointbreak.js](https://github.com/weblinc/pointbreak.js) - It provides a friendly interface to matchMedia with named media queries and easy to create callbacks.


## Copyright and license

Copyright (C) 2015 amazingSurge Ltd.

Licensed under [the GPL license](LICENSE-GPL).


[bower-image]: https://img.shields.io/bower/v/breakpoints.js.svg?style=flat
[bower-link]: https://david-dm.org/amazingsurge/breakpoints.js/dev-status.svg

[devdeps-image]: https://img.shields.io/david/dev/amazingsurge/breakpoints.js.svg?style=flat
[devdeps-link]: https://david-dm.org/amazingsurge/breakpoints.js#info=devDependencies
