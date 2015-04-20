var UnionSize = function(names) {
    this.name = names;
    this.sizes = [];

    var self = this;

    var media = [];
    each(names.split(' '), function(i, name){
        var size = Breakpoints.get(name);
        if(size){
            self.sizes.push(size);
            media.push(size.media);
        }
    });

    this.media = media.join(',');

    this.initialize.apply(this);
};

UnionSize.prototype = MediaQuery.prototype;
UnionSize.prototype.constructor = UnionSize;
