class drawablePhObject extends drawableObject {
    constructor(options) {
        super(options);
        this.options = options || {};
    }


    draw(context, camera, body) {
        for (var f = body.GetFixtureList(); f != null; f = f.GetNext()) {
            var shape = f.GetShape();
            this.drawPolygon(context, camera, body, shape);
        }
    }

    drawPolygon(context, camera, body, shape) {
        context.strokeStyle = this.options.strokeStyle || '#aeeaae';
        context.fillStyle = this.options.fillStyle || '#12432a';
        context.lineWidth = this.options.lineWidth || 1;

        context.beginPath();

        var vert = shape.GetVertices();
        var position = body.GetPosition();
        var tV = position.Copy();
        var a = vert[0].Copy();
        a.MulM(body.GetTransform().R);
        tV.Add(a);

        var _v = convert.getOffset(tV); // -> (x, worldHeight - y)
        var _vDisp = convert.toDisplayUnits(_v);
        var _vCam = camera.worldToScreen(_vDisp);

        context.moveTo(_vCam.x, _vCam.y);

        for (var i = 0; i < vert.length; i++) {
            //Get a copy of the vertice
            var v = vert[i].Copy();

            //Rotate the vertice
            v.MulM(body.GetTransform().R);
            v.Add(position);

            //Subtract the camera coordinates to get relative offsets
            var _v = convert.getOffset(v);
            var _vDisp = convert.toDisplayUnits(_v);
            var _vCamNx = camera.worldToScreen(_vDisp);

            //Draw line to the new point
            context.lineTo(_vCamNx.x, _vCamNx.y);
        }
        context.lineTo(_vCam.x, _vCam.y);

        context.fill();
        context.stroke();
    }

}