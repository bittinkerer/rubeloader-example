class homeGameState extends gameState {
    constructor(canvas, userInput, playState, controlsState) {
        super();
        this.canvas = canvas;
        this._gameState = gameState;
        this._userInput = userInput;

        this.selectedMenuOption = 0;
        this.menuOptions = ['play', 'controls'];
        this.gameStates = [ 
            { moveState: playState, title: 'START GAME' }, 
            { moveState: controlsState, title: 'CONTROLS'} 
        ];

        this.initCursorPosition = new b2Vec2(this.canvas.width - 467, 345);
        this.cursorPosition = this.initCursorPosition;
        this.cursor = new drawableTriangle(
            [new b2Vec2(0, 0), new b2Vec2(-25, 13), new b2Vec2(-25, -13)],
            { fillStyle: '#5a5a5a', strokeStyle: '#000' }
        );
        this.writer = new textWriter(
            { font: 'bold 31px sans-serif', color: '#5a5a5a', context: canvas.getContext('2d') }
        );
        this._inputHandler = new homeInputHandler(this);
    }

    init() {

    }

    update(gameTime) {

        // handle input
        this._inputHandler.handleInput(gameTime, this._userInput.UserActions);
    }

    draw(context) {
        this.cursor.draw(context, this.cursorPosition);

        // write info
        var textPos = new b2Vec2(this.canvas.width - 460, 356);
        this.writer.writeText(textPos, 'START GAME', context);
        textPos.y += 32;
        this.writer.writeText(textPos, 'CONTROLS', context);
        textPos.y += 32;

    }

    //
    // Helper functions
    moveCursorDown() {
        this.selectedMenuOption = (this.selectedMenuOption + 1) % this.menuOptions.length;
        this.cursorPosition = new b2Vec2(this.initCursorPosition.x, this.initCursorPosition.y + (32 * this.selectedMenuOption));
    }

    moveCursorUp() {
        this.selectedMenuOption = (this.selectedMenuOption - 1 < 0 ? this.menuOptions.length - 1 : this.selectedMenuOption - 1);
        this.cursorPosition = new b2Vec2(this.initCursorPosition.x, this.initCursorPosition.y + (32 * this.selectedMenuOption));
    }

    nextState() {
        this.gameStates[this.selectedMenuOption].moveState();
    }
}