/*
 * Camera class to transform world coordinates to screen coordinates
 * Works with canvas position
 * Needs position and size in pixels and canvas coordinates
 */
class Camera {
    constructor(position, viewportSize, worldSize) {
        this.position = position;
        this.viewportSize = viewportSize;
        this.worldSize = worldSize;
        this.horScrollArea = new b2Vec2(100,100);
        this.verScrollArea = new b2Vec2(viewportSize.y * .65, viewportSize.y * 0.33);
    }

    get ViewportWidth() { return this.viewportSize.x; }
    get ViewportHeight() { return this.viewportSize.y; }

    get Position() { return this.position; }
    set Position(pos) {
        this.position = new b2Vec2(
            Math.clamp(pos.x, 0, this.worldSize.x - this.ViewportWidth),
            Math.clamp(pos.y, 0, this.worldSize.y - this.ViewportHeight)
        );
    }

    get VerScrollArea() {
        return this.verScrollArea;
    }

    get HorScrollArea() {
        return this.horScrollArea;
    }

    moveWithSimUnits(offset) {
        var offsetInDispUnits = convert.toDisplayUnits(offset);
        offsetInDispUnits.y *= -1;
        this.move(offsetInDispUnits);
    }

    move(offset) {
        this.Position = this.Position.addTo(offset);
    }

    worldToScreen(objPosition) {
        return new b2Vec2(objPosition.x - this.position.x, 
                        objPosition.y - this.position.y);
    }

    worldToScreenWithSimUnits(objPosition) {
        var camPosInSimUnits = convert.toSimUnits(this.position);
        return new b2Vec2(objPosition.x - camPosInSimUnits.x, 
            objPosition.y - camPosInSimUnits.y);
    }

    screenToWorld(objPosition) {
        return new b2Vec2(objPosition.x + this.position.x,
                        objPosition.y + this.position.y);
    }

    screenToWorldWithSimUnits(objPositionInSimUnits) {
        var camPosInSimUnits = convert.toSimUnits(this.position);
        return new b2Vec2(objPositionInSimUnits.x + camPosInSimUnits.x,
            objPositionInSimUnits.y + camPosInSimUnits.y);
    }

    repositionCamera(player) {
        var camera = this;
        var playerScreenPosInDispUnits = camera.worldToScreen(
            convert.toDisplayUnitsWithOffset(player.Position)
        );
        // Handle going up
        if (player.Body.GetLinearVelocity().y > 0 && playerScreenPosInDispUnits.y < camera.VerScrollArea.x) {
            var diff = playerScreenPosInDispUnits.y - camera.VerScrollArea.x;
            camera.move(new b2Vec2(0, diff));
        }
        // Handle going down
        else if (player.Body.GetLinearVelocity().y < 0 && playerScreenPosInDispUnits.y > (camera.ViewportHeight - camera.VerScrollArea.y)) {
            var diff = playerScreenPosInDispUnits.y - (camera.ViewportHeight - camera.VerScrollArea.y);
            camera.move(new b2Vec2(0, diff));
        }
        // Handle going right
        if (player.Body.GetLinearVelocity().x > 0 && playerScreenPosInDispUnits.x > (camera.ViewportWidth - camera.HorScrollArea.x)) {
            var diff = playerScreenPosInDispUnits.x - (camera.ViewportWidth - camera.HorScrollArea.x);
            camera.move(new b2Vec2(diff, 0));
        }
        // Handle going left
        else if (player.Body.GetLinearVelocity().x < 0 && playerScreenPosInDispUnits.x < camera.HorScrollArea.x) {
            var diff = playerScreenPosInDispUnits.x - camera.HorScrollArea.x;
            camera.move(new b2Vec2(diff, 0));
        }
    }
    
}