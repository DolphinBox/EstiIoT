/*
 * test/dom-event.js:
 *
 * Copyright (c) 2014
 * MIT LICENCE
 *
 */

define([
  'jquery',
  'proclaim',
  'sinon',
  'fakey',
  'dom-event'
], function ($, assert, sinon, fakey, DOMEvent) {


// ----------------------------------------------------------------------------
// Reusable
// ----------------------------------------------------------------------------

var $workboard = $('#workboard'),
    $inpt, evtListener;


// ----------------------------------------------------------------------------
// Test
// ----------------------------------------------------------------------------

describe('dom-event.js', function () {

  // Clean up listeners if they exist
  // & reset workboard
  beforeEach(function () {
    if (evtListener) {
      evtListener.remove();
    }

    $workboard.html('<input type="text">');
    $inpt = $workboard.find('input');
  });

  // Empty workboard
  after(function () {
    $workboard.html('');
  });

  it('Should return instance with add and remove methods.', function () {
    evtListener = new DOMEvent($inpt[0], 'keypress', function () {});
    assert.ok(evtListener.add);
    assert.ok(evtListener.remove);
  });

  it('Should add EventListener.', function () {
    evtListener = new DOMEvent($inpt[0], 'keypress', function () {
      assert.ok(true);
    });

    fakey.key($inpt[0], 'a');
  });

  it('Should call handler with the default context.', function () {
    evtListener = new DOMEvent($inpt[0], 'keypress', function () {
      assert.equal(this, $inpt[0]);
    });

    fakey.key($inpt[0], 'a');
  });

  it('Should call handler with the specified context.', function () {
    var context = {};

    evtListener = new DOMEvent($inpt[0], 'keypress', function () {
      assert.equal(this, context);
    }, context);

    fakey.key($inpt[0], 'a');
  });

  it('Should normalize event objects stopPropagation.', function () {
    evtListener = new DOMEvent($inpt[0], 'keypress', function (evt) {
      evt.stopPropagation();
    });

    var dummy = new DOMEvent(document, 'keypress', function () {
      assert.ok(false);
    });

    fakey.key($inpt[0], 'a');
    dummy.remove();
  });

  it('Should normalize event objects preventDefault.', function () {
    evtListener = new DOMEvent($inpt[0], 'keypress', function (evt) {
      evt.preventDefault();
    });

    fakey.key($inpt[0], 'a');
    assert.equal($inpt[0].value, '');
  });

  it('Should remove EventListener.', function () {
    evtListener = new DOMEvent($inpt[0], 'keypress', function (evt) {
      assert.ok(false);
    });

    evtListener.remove();
    fakey.key($inpt[0], 'a');
  });

  it('Should re-attach EventListener.', function () {
    evtListener = new DOMEvent($inpt[0], 'keypress', function (evt) {
      assert.ok(true);
    });

    evtListener.remove();
    evtListener.add();
    fakey.key($inpt[0], 'a');
  });

});


});