'use strict';

import ChangeEvent from '../../src/changeEvent';

describe('ChangeEvent', () => {
  describe('ChangeEvent.on()', () => {
    it('should bind fn to the list', () => {
      ChangeEvent.off();

      let fn = function(){};
      ChangeEvent.on(fn);

      expect(ChangeEvent.callbacks.length).to.equal(1);
      expect(ChangeEvent.callbacks.list[0].fn).to.equal(fn);
    });

    it('should trigger multi times', () => {
      ChangeEvent.off();

      let count = 0;
      ChangeEvent.on(function(){
        count++;
      });

      ChangeEvent.trigger('lg');
      expect(count).to.equal(1);

      ChangeEvent.trigger('lg');
      expect(count).to.equal(2);
    });

    it('should pass data to trigger', ()=>{
      ChangeEvent.off();

      let data = {
        foo: 'bar'
      };
      ChangeEvent.on(data, function(d){
        expect(d).to.equal(data);
      });

      ChangeEvent.trigger('lg');
    });
  });

  describe('ChangeEvent.one()', () => {
    it('should bind fn to the list', () => {
      ChangeEvent.off();

      let fn = function(){};
      ChangeEvent.one(fn);

      expect(ChangeEvent.callbacks.length).to.equal(1);
      expect(ChangeEvent.callbacks.list[0].fn).to.equal(fn);
    });

    it('should trigger once', () => {
      ChangeEvent.off();

      let count = 0;
      ChangeEvent.one(function(){
        count++;
      });

      ChangeEvent.trigger('lg');
      expect(count).to.equal(1);

      ChangeEvent.trigger('lg');
      expect(count).to.equal(1);
    });
  });

  describe('ChangeEvent.trigger()', () => {
    it('should trigger the fn', () => {
      ChangeEvent.off();
      let current = 'md';
      ChangeEvent.current = current;

      let size = 'lg';

      ChangeEvent.on(function(){
        expect(this.current).to.equal(size);
        expect(this.previous).to.equal(current);
      });

      ChangeEvent.trigger(size);
    });
  });

  describe('ChangeEvent.off()', () => {
    it('should empty the callbacks list',() => {
      ChangeEvent.on(function(){});
      ChangeEvent.off();

      expect(ChangeEvent.callbacks.length).to.equal(0);
    });
  });
});
