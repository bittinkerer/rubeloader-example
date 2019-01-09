/***************************************************************
 *      STELLAR JUMP (Copyright 2019 @ SimpliFun Studio)
 *      By Ernesto Pavon Rodriguez
 *      
 *      Game Main Entry Point
 *      Use this to set up game transitions
 *
 *************************************************************** */

let canvas = document.getElementById('canvas');
var _gameState;

//
// Initialize 
window.onload = init;
function init() {

    // handle input
    var _userInput = new userInput();
    var el = document.getElementsByTagName("BODY")[0];
    el.onkeydown = el.onkeyup = (event) => _userInput.onKeyEvent(event);
    
    _gameState = new playGameState(canvas, _userInput, () => { _gameState = homeState; });

    // start game loop
    var gameLoop = new GameLoop(canvas, update, draw);
    gameLoop.start();
}

//
// update - called every frame
function update(dt) {

    // update game state
    _gameState.update(dt);
}

//
// draw - called every frame
function draw(context) {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    _gameState.draw(context);

}



