class drawableObject {
    constructor(options) {
        if(this.constructor == drawableObject) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.options = options || {};
        this.options.fillStyle = this.options.fillStyle || "#acacad";
        this.options.strokeStyle = this.options.strokeStyle || "#000";
    }

    draw() {
        throw new Error("Method 'draw' must be implemented.");
    }
}