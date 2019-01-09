class textWriter {
    constructor(options) {
        this.options = options || {};
        this.font = options.font;
        this.color = options.color;
        this.context = options.context;
    }
    
    writeText(pos, text, context) {
        var ctx = this.context || context;
        ctx.save();
        var options = this.options || {};

        if ('shadow' in options) {
            ctx.shadowColor = options.shadow.color;
            ctx.shadowOffsetX = options.shadow.x;
            ctx.shadowOffsetY = options.shadow.y;
            ctx.shadowBlur = options.shadow.blur;
        }

        ctx.font = this.font;
        /*ctx.textAlign = 'center';*/
        ctx.fillStyle = this.color;

        if ('align' in options) {
            ctx.textAlign = options.align;
        }

        ctx.fillText(text, pos.x, pos.y);
        ctx.restore();
    }

    writeGameObjectData(dispPos, aGameObject) {
        writeText(dispPos, '_____________');
        dispPos.y += 12;      
        writeText(dispPos, `| name: ${aGameObject.Name}`);
        dispPos.y += 12;
        writeText(dispPos, `| x: ${aGameObject.Position.x.toFixed(2)}, y: ${aGameObject.Position.y.toFixed(2)}`);
        dispPos.y += 12;
        writeText(dispPos, '|___________');
        return new b2Vec2(dispPos.x, dispPos.y + 12);
    }
}