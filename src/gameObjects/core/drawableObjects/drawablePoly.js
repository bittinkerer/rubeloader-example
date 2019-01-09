class drawablePoly extends drawableObject {
    constructor(vertices, options) {
        super(options);
        this.vertices = vertices;
        this.options = options || {};
    }

    get Verts() {
        return this.vertices;
    }

    draw(context, camera, position) {
        context.strokeStyle = this.options.strokeStyle || '#aeeaae';
        context.fillStyle = this.options.fillStyle || '#12432a';
        context.lineWidth = this.options.lineWidth || 1;

        var displayPos = convert.toDisplayUnitsWithOffset(position);
        var screenPos = camera.worldToScreen(displayPos);
        var dispVertices = [];
        for(var i = 0; i < this.vertices.length; ++i) {
            var v = this.vertices[i];
            var vPos = screenPos.addTo(convert.toDisplayUnits(v));
            dispVertices.push(vPos);
        }

        context.beginPath();
        var vDisp = dispVertices[0];
        context.moveTo(vDisp.x, vDisp.y);
        for(var i = 1; i < dispVertices.length; ++i) {
            context.lineTo(dispVertices[i].x, dispVertices[i].y);
        }
        context.closePath();
        context.fill();
        context.stroke();
    }

    static rectVertices(size) {
        var halfWidth = size.x / 2;
        var halfHeight = size.y / 2;
        var vertices = [ 
            new b2Vec2(-halfWidth, halfHeight), 
            new b2Vec2(-halfWidth, -halfHeight), 
            new b2Vec2(halfWidth, -halfHeight), 
            new b2Vec2(halfWidth, halfHeight) 
        ];
        return vertices;
    }

}