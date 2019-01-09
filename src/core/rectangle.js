class rectangle {
    constructor(topLeftPoint, dimensions) {
        this.topLeftPoint = topLeftPoint;
        this.dimensions = dimensions;
    }

    /**
     * Properties
     */

    get X() {
        return this.topLeftPoint.x;
    }

    get Y() {
        return this.topLeftPoint.y;
    }

    get Width() {
        return this.dimensions.x;
    }

    get Height() {
        return this.dimensions.y;
    }

    intersects(aPoint) {
        if (this.X > aPoint.x
            || this.Y < aPoint.y
            || this.X + this.Width < aPoint.x
            || this.Y - this.Height > aPoint.y) {
            return false;
        }
        return true;
    }
}