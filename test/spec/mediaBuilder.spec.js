'use strict';

import MediaBuilder from '../../src/mediaBuilder';

describe('MediaBuilder', () => {
  it('should build the min media correctly', () => {
    expect(MediaBuilder.min(100)).to.equal('(min-width: 100px)');
    expect(MediaBuilder.min(100, 'px')).to.equal('(min-width: 100px)');
    expect(MediaBuilder.min(100, 'rem')).to.equal('(min-width: 100rem)');
  });
  it('should build the max media correctly', () => {
    expect(MediaBuilder.max(100)).to.equal('(max-width: 100px)');
    expect(MediaBuilder.max(100, 'px')).to.equal('(max-width: 100px)');
    expect(MediaBuilder.max(100, 'rem')).to.equal('(max-width: 100rem)');
  });
  it('should build the between media correctly', () => {
    expect(MediaBuilder.between(100, 200)).to.equal('(min-width: 100px) and (max-width: 200px)');
    expect(MediaBuilder.between(100, 200, 'px')).to.equal('(min-width: 100px) and (max-width: 200px)');
    expect(MediaBuilder.between(100, 200, 'rem')).to.equal('(min-width: 100rem) and (max-width: 200rem)');
  });
  it('should get the media correctly', () => {
    expect(MediaBuilder.get(0, 767, 'px')).to.equal('(max-width: 767px)');
    expect(MediaBuilder.get(768, 1199, 'px')).to.equal('(min-width: 768px) and (max-width: 1199px)');
    expect(MediaBuilder.get(1200, Infinity, 'px')).to.equal('(min-width: 1200px)');

    expect(MediaBuilder.get(0, 19, 'rem')).to.equal('(max-width: 19rem)');
    expect(MediaBuilder.get(20, 49, 'rem')).to.equal('(min-width: 20rem) and (max-width: 49rem)');
    expect(MediaBuilder.get(50, Infinity, 'rem')).to.equal('(min-width: 50rem)');
  });
  it('should use px as default unit', () => {
    expect(MediaBuilder.get(0, 767)).to.equal('(max-width: 767px)');
    expect(MediaBuilder.get(768, 1199)).to.equal('(min-width: 768px) and (max-width: 1199px)');
    expect(MediaBuilder.get(1200, Infinity)).to.equal('(min-width: 1200px)');
  });
});
