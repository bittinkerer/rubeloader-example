class drawablePlatform extends drawableObject {
    constructor(width, options) {
        super(options);
        this.width = width ;
    }

    get Width() {
        return this.width;
    }

    draw(context, camera, position) {
        context.strokeStyle = this.options.strokeStyle || '#000';
        context.lineWidth = this.options.lineWidth || 2;
        
        context.beginPath();
        var firstPos = convert.toDisplayUnitsWithOffset(position);
        var firstScreenPos = camera.worldToScreen(firstPos);
        var secondPos = convert.toDisplayUnitsWithOffset(new b2Vec2(position.x + this.width, position.y));
        var secondScreenPos = camera.worldToScreen(secondPos);

        context.moveTo(firstScreenPos.x, firstScreenPos.y);
        context.lineTo(secondScreenPos.x, secondScreenPos.y);
        context.stroke();
    }
}
