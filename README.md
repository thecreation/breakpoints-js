# [breakpoints-js](https://github.com/amazingSurge/breakpoints-js) ![bower][bower-image] [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![prs-welcome]](#contributing)

> `breakpoints-js` is a lightweight, pure javascript library for attaching callbacks to breakpoints. 

## Table of contents
- [Main files](#main-files)
- [Quick start](#quick-start)
- [Usage](#usage)
- [Examples](#examples)
- [Defaults](#defaults)
- [Methods](#methods)
- [Browser support](#browser-support)
- [Contributing](#contributing)
- [Development](#development)
- [Changelog](#changelog)
- [Other Projects](#other-projects)
- [Copyright and license](#copyright-and-license)

## Main files
```
dist/
├── breakpoints.js
├── breakpoints.es.js
└── breakpoints.min.js
```
## Quick start
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/amazingSurge/breakpoints-js/master/dist/breakpoints.min.js
[max]: https://raw.github.com/amazingSurge/breakpoints-js/master/dist/breakpoints.js

#### Install From Bower
```sh
bower install breakpoints.js --save
```

#### Install From Npm
```sh
npm install breakpoints-js --save
```

#### Install From Yarn
```sh
yarn add breakpoints-js
```

###Build From Source

If you want build from source:

```sh
git clone git@github.com:amazingSurge/breakpoints-js.git
cd breakpoints-js
npm install
npm install -g gulp-cli babel-cli
gulp build
```

Done!

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

## Examples
There are some example usages that you can look at to get started. They can be found in the
[examples folder](https://github.com/amazingSurge/breakpoints-js/tree/master/examples).

## Defaults
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

## Methods
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


## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_32x32.png" alt="IE"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | 9-11 ✓ | Latest ✓ |


- [`matchMedia` browser support](http://caniuse.com/#search=matchMedia) work perfect on all modern browsers (IE10+, firefox, chrome, android and safari).
- With some polyfills (like the ones included in [matchMedia.js](https://github.com/paulirish/matchMedia.js/)) Breakpoints works perfect in IE6-9 as well.


## Contributing
Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md). Make sure you're using the latest version of `jquery-scrollTo` before submitting an issue. There are several ways to help out:

* [Bug reports](CONTRIBUTING.md#bug-reports)
* [Feature requests](CONTRIBUTING.md#feature-requests)
* [Pull requests](CONTRIBUTING.md#pull-requests)
* Write test cases for open bug issues
* Contribute to the documentation

## Development
`jquery-scrollTo` is built modularly and uses Gulp as a build system to build its distributable files. To install the necessary dependencies for the build system, please run:

```sh
npm install -g gulp
npm install -g babel-cli
npm install
```

Then you can generate new distributable files from the sources, using:
```
gulp build
```

More gulp tasks can be found [here](CONTRIBUTING.md#available-tasks).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/amazingSurge/jquery-scrollTo/releases).


## Other Projects

If you like this project then I encourage you to check out a few of my other hand-selected projects.

- [enquire.js](http://wicky.nillia.ms/enquire.js/) - A lightweight, pure JavaScript library for responding to CSS media queries.
- [mediaquery](http://formstone.it/components/mediaquery/) - A jQuery plugin for responsive media query events.
- [strapPoint](https://github.com/dannynimmo/strapPoint) - A small jQuery utility plugin to make working with Bootstrap breakpoints easier.
- [pointbreak.js](https://github.com/weblinc/pointbreak.js) - It provides a friendly interface to matchMedia with named media queries and easy to create callbacks.

## Copyright and license

Copyright (C) 2016 amazingSurge.

Licensed under [the LGPL license](LICENSE).

[⬆ back to top](#table-of-contents)

[bower-image]: https://img.shields.io/bower/v/breakpoints.js.svg?style=flat
[bower-link]: https://david-dm.org/amazingSurge/breakpoints-js/dev-status.svg
[npm-image]: https://badge.fury.io/js/breakpoints-js.svg?style=flat
[npm-url]: https://npmjs.org/package/breakpoints-js
[license]: https://img.shields.io/npm/l/breakpoints-js.svg?style=flat
[prs-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[daviddm-image]: https://david-dm.org/amazingSurge/breakpoints-js.svg?style=flat
[daviddm-url]: https://david-dm.org/amazingSurge/breakpoints-js
