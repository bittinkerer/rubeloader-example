class drawableCircle extends drawableObject {
    constructor(radius, options) {
        super(options);
        this.radius = radius;
        this.options = options || {};
    }

    
    draw(context, camera, position) {
        context.save();
        context.strokeStyle = this.options.strokeStyle || '#f45041';
        context.fillStyle = this.options.fillStyle || '#f48f42';
        context.lineWidth = this.options.lineWidth || 1;

        var displayPos = convert.toDisplayUnitsWithOffset(position);
        var screenPos = camera.worldToScreen(displayPos);
        var displayRadius = convert.toDisplayUnits(this.radius);

        context.beginPath();
        context.arc(screenPos.x, screenPos.y, displayRadius, 0, 2 * Math.PI, false);
        context.fill();
        context.stroke();
        context.restore();
    }
}