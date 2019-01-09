class imageHelper {
    static imageFromPath(imgName) {
        var im = new Image();
        im.src = `../assets/images/${imgName}`;
        return im;
    }
}