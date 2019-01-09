class drawableEdge extends drawableObject {
    constructor(verts, options) {
        super(options);
        this.verts = verts;
        
    }    

    get Verts() {
        return this.verts;
    }

    draw(context,camera) {
        var verts = this.verts;
        context.strokeStyle = this.options.strokeStyle || '#000';
        context.lineWidth = this.options.lineWidth || 2;

        context.beginPath();
        for(var i = 0; i < this.verts.length - 1; ++i) {
            var firstDispPos = convert.toDisplayUnitsWithOffset(verts[i]);
            var firstScreenPos = camera.worldToScreen(firstDispPos);
            var secondDispPos = convert.toDisplayUnitsWithOffset(verts[i+1]);
            var secondScreenPos = camera.worldToScreen(secondDispPos);

            context.moveTo(firstScreenPos.x, firstScreenPos.y);
            context.lineTo(secondScreenPos.x, secondScreenPos.y);
        }
        context.stroke();
    }
}