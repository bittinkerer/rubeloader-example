class homeInputHandler {
    constructor(gameState) {
        this.gameState = gameState;
    }

    handleInput(gameTime, userAction) {
        if (userAction.includes(userActions.X)) {
            userAction.splice(userAction.indexOf(userActions.X), 1);
            this.gameState.nextState();
        }

        if(userAction.includes(userActions.Down)) {
            this.gameState.moveCursorDown();
            userAction.splice(userAction.indexOf(userActions.X), 1);
        }

        if(userAction.includes(userActions.Up)) {
            this.gameState.moveCursorUp();
            userAction.splice(userAction.indexOf(userActions.X), 1);
        }
    }
}