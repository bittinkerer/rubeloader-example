class drawableTriangle extends drawableObject {
    constructor(verts, options) {
        super(options);
        this.verts = verts;
        this.options = options || {};
    }

    draw(context, position) {
        if(!context || !position) {
            throw { message: `${nameof({context})} and/or ${nameof({position})} is null or undefined` };
        }

        var position = position;
        var verts = this.verts;
        context.fillStyle = this.options.fillStyle || '#5a5a5a';
        context.strokeStyle = this.options.strokeStyle || '#000';
        
        context.beginPath();
        context.moveTo(position.x + verts[0].x, position.y + verts[0].y);
        context.lineTo(position.x + verts[1].x, position.y + verts[1].y);
        context.lineTo(position.x + verts[2].x, position.y + verts[2].y);
        context.fill();
    }
}