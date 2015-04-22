var Size = function(name, min, max, unit) {
    this.name = name;
    this.min = min ? min : 0;
    this.max = max ? max : Infinity;

    this.media = MediaBuilder.get(this.min, this.max, unit);

    this.initialize.apply(this);

    var self = this;
    this.changeListener = function() {
        if (self.isMatched()) {
            ChangeEvent.trigger(self);
        }
    };
    if (this.isMatched()) {
        ChangeEvent.current = this;
    }
    this.mql.addListener(this.changeListener);
};

Size.prototype = MediaQuery.prototype;
Size.prototype.constructor = Size;

extend(Size.prototype, {
    destory: function() {
        this.off();
        this.mql.removeListener(this.changeHander);
    }
});
