# Timer <sup>v1.0.0</sup>

The vanilla ES6 JavaScript simple timer module for any needs. Takes an
existing HTML element and creates a timer from it.

Installation
------------

You can just take ready-to-use `index.js` file from this repository.
But the better way would be to clone this repository as a git submodule into your project:

```bash
cd your/project/directory
git submodule add https://github.com/ZitRos/Timer.git source/client/js/Timer
```

**NOTE:** `your/project/directory` is the directory **of your project**, `source/js/Toast`
is the sub-directory **in your project** where this repository will be cloned.

Usage
-----

Lets say we have this HTML:
 
```html
<div>
    Time since page load: <span id="timer"></span>
</div>
```

To initialize timer, and, for example, set the count up timer (default one), write the next JavaScript:

```js
import Timer from `./Timer`; // directory where timer is stored

let timerElement = document.querySelector(`#timer`),
    timer = new Timer(timerElement);

// For example, this makes timer start from beginning each click on it 
timerElement.addEventListener(`click`, () => {
    timer.reset({ autoStart: false }).start(); // chain sample!
});
```

API
---

+ [Timer(element, [options])](#timerelement-options)
    + [reset()](#reset-returns-timer)
    + [start()](#start-returns-timer)
    + [stop()](#stop-returns-timer)
    + [update()](#update-returns-timer)

##### Timer(element, [options])

Constructor. Initializes the timer over the element.

+ `element` - HTML element.
+ `options` - Optional object with additional configuration.
    + `mask` `{string}` = `"hh:mm:ss"` - Output format. `h`, `m`, `s` and doubles are supported.
    + `updateInterval` `{number}` = `1000` - Timer update interval in milliseconds.
    + `type` `{string}` = `"countup"` - Timer type.
    + `initialTime` `{number}` = `0` - Initial time in milliseconds.
    + `autoStart` `{boolean}` = `true` - Start the timer when constructor instantiated.
    
##### reset([options]) `@returns {Timer}`

Resets the timer to it's initial state. Optionally takes `options` which
are the same as in constructor.
    
##### start() `@returns {Timer}`

Start the timer. 

##### stop() `@returns {Timer}`

Stops the timer.

##### update() `@returns {Timer}`

Refreshes timer UI. Not for potential use, as timer calls this function
each time it updates.