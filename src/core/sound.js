class sound {
    constructor(src) {
        this.basePath = '../assets/sounds/';
        this.sound = document.createElement("audio");
        this.sound.src = this.basePath + src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.play();
        }
        this.stop = function () {
            this.sound.pause();
        }
    }
}