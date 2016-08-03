'use strict';

import Breakpoints from '../../src/breakpoints';

describe('Breakpoints', () => {
  describe('Breakpoints()', () => {
    it('should have Breakpoints', () => {
      expect(Breakpoints).to.exist;
      expect(window.Breakpoints).to.exist;
    });
  });
});
