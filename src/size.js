import MediaQuery from './mediaQuery';
import MediaBuilder from './mediaBuilder';
import ChangeEvent from './changeEvent';

export default class Size extends MediaQuery {
  constructor(name, min = 0, max = Infinity, unit = 'px') {
    let media = MediaBuilder.get(min, max, unit);
    super(name, media);

    this.min = min;
    this.max = max;
    this.unit = unit;

    const that = this;
    this.changeListener = () => {
      if (that.isMatched()) {
        ChangeEvent.trigger(that);
      }
    };
    if (this.isMatched()) {
      ChangeEvent.current = this;
    }

    this.mql.addListener(this.changeListener);
  }

  destroy() {
    this.off();
    this.mql.removeListener(this.changeListener);
  }
}
