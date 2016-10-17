'use strict';

import MediaQuery from '../../src/mediaQuery';

describe('MediaQuery', () => {
  let media = '(max-width: 767px)';
  let name = 'sm';
  let mediaQuery = new MediaQuery(name, media);

  describe('new MediaQuery()', () => {
    it('should receive name and media argments', () => {
      expect(mediaQuery).to.exists;
      expect(mediaQuery.name).to.equal(name);
      expect(mediaQuery.media).to.equal(media);
    });

    it('should initialized after constructor', () => {
      expect(mediaQuery.callbacks).to.exists;
    });
  });

  describe('mediaQuery.on()', () => {
    it('can receive object as first argment', ()=>{
      let mediaQuery = new MediaQuery(name, media);

      mediaQuery.on({});
      expect(mediaQuery.callbacks.enter.length).to.equal(0);
      expect(mediaQuery.callbacks.leave.length).to.equal(0);

      mediaQuery.on({
        enter: function(){},
        leave: function(){}
      });
      expect(mediaQuery.callbacks.enter.length).to.equal(1);
      expect(mediaQuery.callbacks.leave.length).to.equal(1);

      mediaQuery.on({
        enter: function(){}
      });
      expect(mediaQuery.callbacks.enter.length).to.equal(2);

      mediaQuery.on({
        leave: function(){}
      });
      expect(mediaQuery.callbacks.leave.length).to.equal(2);
    });

    it('can receive string as first argment', () => {
      let mediaQuery = new MediaQuery(name, media);

      mediaQuery.on('enter', function(){});
      expect(mediaQuery.callbacks.enter.length).to.equal(1);

      mediaQuery.on('enter', function(){});
      expect(mediaQuery.callbacks.enter.length).to.equal(2);
    });

    it('should receive data argment', () => {
      let mediaQuery = new MediaQuery(name, media);

      let data = {foo: 'bar'};
      let data2 = {bar: 'foo'};

      mediaQuery.on({
        enter: function(){},
        leave: function(){}
      }, data);

      expect(mediaQuery.callbacks.enter.list[0].data).to.equal(data);
      expect(mediaQuery.callbacks.leave.list[0].data).to.equal(data);

      mediaQuery.on('enter', data2, function(){});
      expect(mediaQuery.callbacks.enter.list[1].data).to.equal(data2);
    });
  });

  describe('mediaQuery.one()', () => {
    it('should set callback only call once', () => {
      let mediaQuery = new MediaQuery(name, media);

      mediaQuery.one({
        leave: function(){}
      });

      expect(mediaQuery.callbacks.leave.length).to.equal(1);
      expect(mediaQuery.callbacks.leave.list[0].one).to.equal(true);

      mediaQuery.one('leave', function(){});

      expect(mediaQuery.callbacks.leave.length).to.equal(2);
      expect(mediaQuery.callbacks.leave.list[1].one).to.equal(true);
    });
  });

  describe('mediaQuery.off()', () => {
    it('should empty enter and leave callbacks if no argments received', ()=>{
      let mediaQuery = new MediaQuery(name, media);

      mediaQuery.on({
        enter: function(){},
        leave: function(){}
      });

      mediaQuery.off();
      expect(mediaQuery.callbacks.enter.length).to.equal(0);
      expect(mediaQuery.callbacks.leave.length).to.equal(0);
    });

    it('should empty the specify event', () => {
      let mediaQuery = new MediaQuery(name, media);

      mediaQuery.on({
        enter: function(){},
        leave: function(){}
      });

      mediaQuery.off('enter');
      expect(mediaQuery.callbacks.enter.length).to.equal(0);
      expect(mediaQuery.callbacks.leave.length).to.equal(1);

      mediaQuery.off('leave');
      expect(mediaQuery.callbacks.leave.length).to.equal(0);
    });

    it('should remove the specify event with specify fn', () => {
      let mediaQuery = new MediaQuery(name, media);

      let foo = function(){
        return 'foo';
      };
      let bar = function(){
        return 'bar';
      };
      mediaQuery.on('enter', foo);
      mediaQuery.on('enter', bar);

      mediaQuery.off('enter', foo);
      expect(mediaQuery.callbacks.enter.length).to.equal(1);
      let leftCallback = mediaQuery.callbacks.enter.list.pop();
      expect(leftCallback.fn).to.equal(bar);
    });

    it('can receive object as first argment', () => {
      let mediaQuery = new MediaQuery(name, media);

      mediaQuery.on({
        enter: function(){},
        leave: function(){}
      });

      expect(mediaQuery.callbacks.enter.length).to.equal(1);
      expect(mediaQuery.callbacks.leave.length).to.equal(1);

      let foo = function(){
        return 'foo';
      };
      let bar = function(){
        return 'bar';
      };
      mediaQuery.on({
        enter: foo,
        leave: bar
      });
      expect(mediaQuery.callbacks.enter.length).to.equal(2);
      expect(mediaQuery.callbacks.leave.length).to.equal(2);

      mediaQuery.off({
        enter: foo,
        leave: bar
      });
      expect(mediaQuery.callbacks.enter.length).to.equal(1);
      expect(mediaQuery.callbacks.leave.length).to.equal(1);
    });
  });

  describe('mediaQuery.destroy()', () => {
    it('should be act as off()', () => {
      let mediaQuery = new MediaQuery(name, media);

      mediaQuery.on({
        enter: function(){},
        leave: function(){}
      });

      mediaQuery.destroy();

      expect(mediaQuery.callbacks.enter.length).to.equal(0);
      expect(mediaQuery.callbacks.leave.length).to.equal(0);
    });
  });
});
