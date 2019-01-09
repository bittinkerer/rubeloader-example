/*****************
 * gameObjectHandler :
 * manages game objects which are drawn and updated in the game
 * INVARIANT:   As long as gameobject keeps 'Alive' property properly updated,
 *              gameObjectHandler will upon gameObject death, clean up
 *              gameObject from physics engine and remove it from updates / draws.
 ********************/
class gameObjectHandler {
    static init(world) {
        this.world = world;
        this.gameObjects = [];
        this.infoOfGameObjectToCreate = [];
    }

    static addInfoOfGameObjectToCreate(gameObjectInfo) {

    }

    static add(aGameObject) {
        this.gameObjects.push(aGameObject);
    }

    static contains(aGameObject) {
        return this.gameObjects.indexOf(aGameObject) > -1;
    }

    static update(gameTime) {
        for (var i = 0; i < this.gameObjects.length; ++i) {
            var go = this.gameObjects[i];
            go.update(gameTime);
            if(!go.Alive) {
                // if(go.onDeath) {
                //     go.onDeath();
                // }
                this.gameObjects.splice(i, 1);
                this.world.DestroyBody(go.Body);
            }  
        }
    }

    static draw(context, camera) {
        for(const go of this.gameObjects ) {
            go.draw(context, camera);
        }
    }

    
}