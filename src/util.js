export default {
  each: function(obj, fn) {
    let continues;

    for (let i in obj) {
      if (typeof obj !== 'object' || obj.hasOwnProperty(i)) {
        continues = fn(i, obj[i]);
        if (continues === false) {
          break; //allow early exit
        }
      }
    }
  },

  isFunction: function (obj) {
    return typeof obj === 'function' || false;
  },

  extend: function(obj, source) {
    for (let property in source) {
        obj[property] = source[property];
    }
    return obj;
  }
};
