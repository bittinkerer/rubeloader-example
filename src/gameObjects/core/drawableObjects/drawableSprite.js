class drawableSprite extends drawableObject {
    constructor(size, imgName, options) {
        super(options);
        this.size = size;
        this.imgName = imgName;
        this.options = options || {};
    }

    draw(context, camera, position) {
        var displayPos = convert.toDisplayUnitsWithOffset(position);
        var screenPos = camera.worldToScreen(displayPos);
        var image = imageHelper.imageFromPath(this.imgName);
        var dispSize = convert.toDisplayUnits(this.size);
        context.drawImage(image, screenPos.x - (dispSize.x/2), screenPos.y - (dispSize.y/2), dispSize.x, dispSize.y);
    }
}