export default {
  min: function(min, unit = 'px') {
    return `(min-width: ${min}${unit})`;
  },
  max: function(max, unit = 'px') {
    return `(max-width: ${max}${unit})`;
  },
  between: function(min, max, unit = 'px') {
    return `(min-width: ${min}${unit}) and (max-width: ${max}${unit})`;
  },
  get: function(min, max, unit = 'px') {
    if (min === 0) {
      return this.max(max, unit);
    }
    if (max === Infinity) {
      return this.min(min, unit);
    }
    return this.between(min, max, unit);
  }
};
