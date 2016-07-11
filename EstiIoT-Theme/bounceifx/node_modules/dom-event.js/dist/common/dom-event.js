/*
 * dom-event.js
 * 
 * (C) 2014 Jarid Margolin
 * MIT LICENCE
 *
 */





// ----------------------------------------------------------------------------
// DOMEvent
//
// Convenient class used to work with addEventListener.
// ----------------------------------------------------------------------------

function DOMEvent(el, eventName, handler, context) {
  // Make args available to instance
  this.el = el;
  this.eventName = eventName;
  this.handler = handler;
  this.context = context;

  // Attach
  this.add();
}

//
// Handler that manages context, and normalizes both 
// preventDefault and stopPropagation.
//
DOMEvent.prototype._handler = function (e, context) {
  // Copy props to new evt object. This is shallow.
  // Only done so that I can modify stopPropagation
  // and preventDefault.
  var evt = {};
  for (var k in e) {
    evt[k] = e[k];
  }

  // Normalize stopPropagation
  evt.stopPropagation = function () {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  };

  // Normalize preventDefault
  evt.preventDefault = function () {
    if (e.preventDefault) { 
      e.preventDefault();
    } else {
      e.returnValue = false; 
    }
  };

  // Call with context and modified evt.
  this.handler.call(this.context || context, evt);
};

//
// Add the `EventListener`. This method is called internally in
// the constructor. It can also be used to re-attach a listener
// that was previously removed.
//
DOMEvent.prototype.add = function () {
  // Cache this
  var self = this;

  // Cache handler so it can be removed.
  self.cachedHandler = function (e) {
    self._handler.call(self, e, this);
  };

  // Modified handler
  self.el.addEventListener(self.eventName, self.cachedHandler, false);
};

//
// Remove the `EventListener`
//
DOMEvent.prototype.remove = function () {
  this.el.removeEventListener(this.eventName, this.cachedHandler);
};


// ----------------------------------------------------------------------------
// Expose
// ----------------------------------------------------------------------------

module.exports = DOMEvent;


