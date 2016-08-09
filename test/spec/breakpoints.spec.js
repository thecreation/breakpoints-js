'use strict';

import Breakpoints from '../../src/breakpoints';
import defaults from '../../src/defaults';
import Size from '../../src/size';

describe('Breakpoints', () => {
  Breakpoints();

  describe('Breakpoints()', () => {
    it('should have Breakpoints', () => {
      expect(Breakpoints).to.exist;
      expect(window.Breakpoints).to.exist;
    });
  });

  describe('Breakpoints.defaults', () => {
    it('should equal defaults', () => {
      expect(Breakpoints.defaults).to.equal(defaults);
    });
  });

  describe('Breakpoints.all()', () => {
    it('should return all names', () => {
      expect(Breakpoints.all()).to.deep.equal(['xs', 'sm', 'md', 'lg']);
    });
  });

  describe('Breakpoints.get()', () => {
    it('should return an instance of Size', () => {
      let size = Breakpoints.get('sm');

      // expect(size).to.be.an.instanceof(Size);
      expect(size.name).to.equal('sm');
    });
  });

  describe('Breakpoints.set()', () => {
    it('should set correctly', () => {
      let name = 'sm';
      let min = 0;
      let max = 1000;
      let unit = 'px';

      Breakpoints.set(name, min, max, unit);

      let size = Breakpoints.get(name);

      expect(size.name).to.equal(name);
      expect(size.min).to.equal(min);
      expect(size.max).to.equal(max);
      expect(size.unit).to.equal(unit);
    });
  });

  it('should get param correctly', () => {
    let name = 'sm';
    let min = 0;
    let max = 1000;

    Breakpoints.set(name, min, max);

    expect(Breakpoints.getMin(name)).to.equal(min);
    expect(Breakpoints.getMax(name)).to.equal(max);
    expect(Breakpoints.getMedia(name)).to.equal('(max-width: 1000px)');
  });
});
