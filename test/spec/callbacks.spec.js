'use strict';

import Callbacks from '../../src/callbacks';

describe('Callbacks', () => {
  let callbacks = new Callbacks();

  it('should exists', () => {
    expect(callbacks).to.exists;
    expect(Object.keys(callbacks.list).length).to.equal(0);
  });

  it('should be able to add the callback to the list', () => {
    callbacks.add(function(){});
    expect(Object.keys(callbacks.list).length).to.equal(1);
  });

  describe('Callbacks.add()', () => {
    it('should receive data as second argument', () => {
      let data = {foo: 'bar'};
      callbacks.add(function(){}, data);
      expect(callbacks.list[callbacks.list.length -1].data).to.equal(data);
    });

    it('should receive one as third argument', () => {
      callbacks.add(function(){}, {}, true);
      expect(callbacks.list[callbacks.list.length -1].one).to.equal(true);
    });
  });

  it('should be able to remove the specify callback', () => {
    let callbacks = new Callbacks();

    let callback = function() {
      console.info('hello');
    }
    callbacks.add(callback);
    expect(Object.keys(callbacks.list).length).to.equal(1);

    callbacks.remove(callback);
    expect(Object.keys(callbacks.list).length).to.equal(0);
  });

  it('should be able to empty the list', () => {
    callbacks.add(function(){});
    callbacks.empty();
    expect(Object.keys(callbacks.list).length).to.equal(0);
  });

  describe('Callbacks.fire()', () => {
    it('should fire the callbacks in order', () => {
      let callbacks = new Callbacks();

      let callback1Called = false;
      let callback2Called = false;
      let last = null;
      let callback1 = function() {
        callback1Called = true;
        last = 1;
      }
      let callback2 = function(){
        callback2Called = true;
        last = 2;
      }

      callbacks.add(callback1);
      callbacks.add(callback2);

      callbacks.fire();
      expect(callback1Called).to.equal(true);
      expect(callback2Called).to.equal(true);
      expect(last).to.equal(2);
    });

    it('should call the callback with data arguments', () => {
      let callbacks = new Callbacks();
      let data = {foo: 'bar'};

      let callback = function(arg) {
        expect(arg).to.equal(data);
      }
      callbacks.add(callback, data);
      callbacks.fire();
    });

    it('should fire again correctly', ()=>{
      let callbacks = new Callbacks();
      let count = 0;
      let callback = function(){
        count++;
      }

      callbacks.add(callback);
      callbacks.fire();
      expect(count).to.equal(1);

      callbacks.fire();
      expect(count).to.equal(2);

      callbacks.fire();
      expect(count).to.equal(3);
    });

    it('should fire once if callback one is set to true', ()=>{
      let callbacks = new Callbacks();
      let count = 0;
      let callback = function(){
        count++;
      }

      callbacks.add(callback, {}, true);
      expect(Object.keys(callbacks.list).length).to.equal(1);

      callbacks.fire();

      expect(Object.keys(callbacks.list).length).to.equal(0);
      expect(count).to.equal(1);

      callbacks.fire();
      expect(count).to.equal(1);

      callbacks.fire();
      expect(count).to.equal(1);
    });

    it('should pass the caller to the callback', () => {
      let caller = {};

      let callbacks = new Callbacks();
      let callback = function(){
        expect(this).to.equal(caller);
      }

      callbacks.add(callback);
      callbacks.fire(caller);
    });

    it('should be able to use fn to take over the default callback call', () => {
      let callbacks = new Callbacks();

      let theFn = function(){}
      let theCaller = {};
      let theData = {};

      callbacks.add(theFn, theData);

      callbacks.fire(theCaller, function(caller, callback, i){
        expect(this).to.equal(callbacks);
        expect(caller).to.equal(theCaller);
        expect(callback.fn).to.equal(theFn);
        expect(callback.data).to.equal(theData);
        expect(parseInt(i)).to.equal(0);
      });
    });
  });
});
