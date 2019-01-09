class controlsGameState extends gameState {
    constructor(canvas, userInput, homeState) {
        super();
        this.canvas = canvas;
        this._userInput = userInput;
        this.writer = new textWriter(
            { font: 'bold 25px sans-serif', color: '#5a5a5a', context: canvas.getContext('2d') }
        );
        this.homeState = homeState;
    }

    update(gameTime) {

    }

    draw(context) {
        // write info
        var textPos = new b2Vec2(this.canvas.width - 460, 356);
        this.writer.writeText(textPos, 'SPACE BAR - Shoot', context);
        textPos.y += 32;
        this.writer.writeText(textPos, 'C - Change weapons', context);
        textPos.y += 32;
    }
}