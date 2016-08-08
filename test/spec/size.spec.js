'use strict';

import Size from '../../src/size';

describe('Size', () => {
  let name = 'sm';
  let min = 0;
  let max = 767;

  let size = new Size(name, min, max);

  describe('new Size()', () => {
    it('should exists', () => {
      expect(size).to.exists;
      expect(size.name).to.equal(name);
      expect(size.min).to.equal(min);
      expect(size.max).to.equal(max);
    });

    it('should initialized after constructor', () => {
      expect(size.callbacks).to.exists;
    });
  });
});
