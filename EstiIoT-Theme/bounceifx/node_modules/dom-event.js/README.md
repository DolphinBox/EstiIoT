dom-event.js [![Build Status](https://travis-ci.org/jaridmargolin/dom-event.js.png)](https://travis-ci.org/jaridmargolin/dom-event.js)
============

A more convenient DOM EventListener.

**Features:**

* pass in context
* normalize `preventDefault` / `stopPropagation` on evt
* returns instance with helper methods
  * [remove()](#remove)
  * [add()](#add)
* AMD and UMD implementations included in `dist`.

---

## Install

```
npm install dom-event.js
```
```
bower install dom-event.js
```

---

## API

### new DOMEvent(el, eventName, handler, context);

Attach an `EventListener` and return a new `DOMEvent` instance.

##### PARAMETERS:

* **\*el**: Element to add the EventListener on.
* **\*eventName**: Name of the event to listen for.
* **\*handler**: Function called when event is fired. Passed `evt` as the first argument.
* **context**: Conetext to call handler with.

##### RETURNS:

A new DomEvent instance.

##### EXAMPLE USAGE:

```
this.pageListener = new DOMEvent(document, 'touchstart', funtion (evt) {
  // do something
}, this);
```

### remove();

Remove the `EventListener`.

**Note**: The event can be re-attached by calling the [add()](#add)

##### EXAMPLE USAGE:

```
this.pageListener.remove();
```

### add();

Add the `EventListener`. This method is called internally in the constructor. It can also be used to re-attach a listener that was previously removed.

##### EXAMPLE USAGE:

```
this.pageListener.add();
```

---

## TESTS

All tests can run locally. All tests are also 
### Local

**Install Dependencies**

```
npm install
```

```
bower install
```

**Run/View**

```
grunt test
```

---

## License

The MIT License (MIT) Copyright (c) 2014 Jarid Margolin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.