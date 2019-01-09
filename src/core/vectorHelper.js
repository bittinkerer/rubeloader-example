(function (vectorHelper) {
    /*
      * normalize2
      * Returns the normal of the vector b.
      */
    vectorHelper.normalize2 = function (b) {
        return Math.sqrt(b.x * b.x + b.y * b.y);
    };


}(window.vectorHelper = window.vectorHelper || {}));

/****
 * Globals
 */
b2Vec2.prototype.toUnitVector = function () {
    var magnitude = normalize2(this);
    return new b2Vec2(this.x / magnitude, this.y / magnitude);
}

b2Vec2.prototype.scale = function (multiplier) {
    return new b2Vec2(this.x * multiplier, this.y * multiplier);
}

b2Vec2.prototype.addTo = function (a) {
    return new b2Vec2(this.x + a.x, this.y + a.y);
}

b2Vec2.prototype.subtract = function (v) {
    return new b2Vec2(this.x - v.x, this.y - v.y);
}