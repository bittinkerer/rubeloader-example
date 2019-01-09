class GameLoop {
    constructor(canvas, update, draw) {
        this.update = update;
        this.draw = draw;
        this.canvas = canvas;
        this.timeOnLastFrame = 0;
    }

    animateFrame(totalTimeElapsed) {
        setTimeout(() => {
            window.requestAnimationFrame(this.animateFrame.bind(this), canvas);
            var elapsedTime = (totalTimeElapsed - this.timeOnLastFrame) * 0.001; // seconds
            this.timeOnLastFrame = totalTimeElapsed;
            this.update(elapsedTime);
            this.draw(this.canvas.getContext('2d'));
            
        }, 1000/60);
    }

    start() {
        window.requestAnimationFrame(this.animateFrame.bind(this), canvas);
    }
}