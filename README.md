# Timer

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
import Timer from "./Timer"; // directory where timer is stored

new Timer(document.querySelector("#timer"), {
    mask: "" // optional, may not be specified
});
```

API
---

+ [Timer(element, [options])](#timerelement-options)

##### Timer(element, [options])

Constructor. Initializes the timer over the element.

+ `element` - HTML element.
+ `options` - Optional object with additional configuration.
    + `mask` `{string}` = `"hh:mm:ss"` - Output format. `h`, `m`, `s` and doubles are supported.
    + `updateInterval` `{number}` = `1000` - Timer update interval in milliseconds.
    + `type` `{string}` = `"countup"` - Timer type.
    + `initialTime` `{number}` = `0` - Initial time in milliseconds.