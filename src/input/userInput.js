class userInput {
    constructor() {
        this.userActionMap = {
            37: userActions.Left,           // left-arrow  
            38: userActions.Up,             // up-arrow 
            39: userActions.Right,          // right-arrow 
            40: userActions.Down,           // down-arrow
            32: userActions.X,              // spacebar
            87: userActions.U,              // w
            83: userActions.D,              // s
            65: userActions.SL,             // a
            68: userActions.SR,             // d
            81: userActions.Q               // q
        };
        this.userActions = [];
    }

    get UserActions() {
        return this.userActions;
    }

    onKeyEvent(event) {
        var keycode;
        var eventType = event.type;

        if (window.event) { // IE
            keycode = event.keyCode;
        }
        else if (event.which) { // Netscape/Firefox/Opera
            keycode = event.which;
        }

        var userAction = this.userActionMap[keycode];
        if (userAction) {
            if (eventType == 'keydown') {
                if (!this.userActions.includes(userAction)) {
                    this.userActions.push(userAction);
                }
            } else { // handle key-up
                var index = this.userActions.indexOf(userAction);
                if (index >= 0) {
                    this.userActions.splice(index, 1);
                }
            }
        }
    }

}