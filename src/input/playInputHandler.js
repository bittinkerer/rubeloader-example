class playInputHandler {
    constructor(player) {
        this.player = player;
        
        // time in seconds
        this.shockReloadTime = 0.5;
        this.timeSinceLastShock = 0;

    }

    handleInput(gameTime, userAction, camera) {
        var player = this.player;
        this.timeSinceLastShock += gameTime;

        if (userAction.includes(userActions.Left)) {
            player.Body.SetLinearVelocity(new b2Vec2(0.075 * player.Body.GetLinearVelocity().x, player.Body.GetLinearVelocity().y));
            player.Body.ApplyImpulse(new b2Vec2(-98, 0), player.Body.GetWorldCenter());
        }
        if (userAction.includes(userActions.Right)) {
            player.Body.SetLinearVelocity(new b2Vec2(0, player.Body.GetLinearVelocity().y));
            player.Body.ApplyImpulse(new b2Vec2(98, 0), player.Body.GetWorldCenter());
        }
        
        // jet up
        if(userAction.includes(userActions.Q) || userAction.includes(userActions.Up)) {
            player.applyJet();
        }

        if(userAction.includes(userActions.Down)) {
            player.applyAntiJet();
        }
        
        // aim down
        if(userAction.includes(userActions.D)) {
            player.AimVector = new b2Vec2(0, -1);
            // remove command from queue
            userAction.erase(userActions.D);
        }

        // aim up
        if(userAction.includes(userActions.U)) {
            player.AimVector = new b2Vec2(0, 1);
            // remove command from queue
            userAction.erase(userActions.U);
        }

        // shoot
        if(userAction.includes(userActions.X)) {
            player.shoot();
            // remove command from queue
            userAction.erase(userActions.X);
        }

        // change weapon
        if(userAction.includes(userActions.SR)) {
            player.changeWeapon();
            // remove command from queue
            userAction.erase(userActions.SR);
        }

        // use jetpack
        if(userAction.includes(userActions.SL)) {
            player.applyJet();
            // remove command from queue
            userAction.erase(userActions.SL)
        }
    }
    
}