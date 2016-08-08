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

      expect(size).to.be.an.instanceof(Size);
      expect(size.name).to.equal('sm');
    });
  });
});
