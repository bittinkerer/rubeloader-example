class bar {
    constructor(position, size, maxFill, options, onEmptied, onFilled) {
        this.position = position;
        this.size = size;
        this.maxFill = maxFill || Number.MAX_VALUE;
        this.fill = this.maxFill;
        this.onEmptied = onEmptied;
        this.onFilled = onFilled;

        // draw options
        this.options = options || {};
        this.options.strokeStyle = options.strokeStyle || '#848e9e';
        this.options.fillStyle = options.fillStyle || '#d7e3f7';
    }

    /*****************
     * PROPERTIES
     *******************/
    get Fill() {
        return this.fill;
    }

    /*****************
     * METHODS
     *******************/
    decrease(amount) {
        var result = this.fill - Math.abs(amount);

        if (result >= 0) {
            this.fill -= amount;
        } else {
            if(this.fill > 0 && this.onEmptied) {
                this.onEmptied();
            }
            this.fill = 0;
        }
        return result;
    }

    increase(amount) {
        if (this.fill + amount <= this.maxFill) {
            this.fill += amount;
        } else {
            this.fill = this.maxFill;
        }
    }

    empty() {
        this.fill = 0;
    }

    draw(context, camera, position) {
        var position = position || this.position;
        // convert position to screen coordinates
        var displayPos = convert.toDisplayUnitsWithOffset(position);
        var screenPos = camera.worldToScreen(displayPos);

        context.fillStyle = this.options.fillStyle;
        context.fillRect(displayPos.x, displayPos.y, this.size.x * (this.fill / this.maxFill), this.size.y);
        context.strokeStyle = this.options.strokeStyle;
        context.strokeRect(displayPos.x, displayPos.y, this.size.x, this.size.y);
    }
}