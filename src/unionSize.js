import MediaQuery from './mediaQuery';
import Breakpoints from './breakpoints';
import util from './util';

export default class UnionSize extends MediaQuery {
  constructor(names) {
    let sizes = [];
    let media = [];

    util.each(names.split(' '), (i, name) => {
      let size = Breakpoints.get(name);
      if(size){
        sizes.push(size);
        media.push(size.media);
      }
    });

    super(names, media.join(','));
  }
}
