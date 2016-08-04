import util from './util';

export default class Callbacks {
  constructor(){
    this.length = 0;
    this.list = [];
  }

  add(fn, data, one = false) {
    this.list.push({
      fn,
      data: data,
      one: one
    });

    this.length++;
  }

  remove(fn) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].fn === fn) {
        this.list.splice(i, 1);
        this.length--;
        i--;
      }
    }
  }

  empty() {
    this.list = [];
    this.length = 0;
  }

  call(caller, i, fn = null) {
    if (!i) {
      i = this.length - 1;
    }
    let callback = this.list[i];

    if (util.isFunction(fn)) {
      fn.call(this, caller, callback, i);
    } else if (util.isFunction(callback.fn)) {
      callback.fn.call(caller || window, callback.data);
    }

    if (callback.one) {
      delete this.list[i];
      this.length--;
    }
  }

  fire(caller, fn = null) {
    for (let i in this.list) {
      if(this.list.hasOwnProperty(i)){
        this.call(caller, i, fn);
      }
    }
  }
}
