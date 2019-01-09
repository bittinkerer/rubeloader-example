class deadBodiesHandler {
    

    /*****************
     * METHODS
     *******************/
    static init(world) {
        this.world = world;
        this.destroyList = [];
    }

    static addToBodiesToDestroy(body) {
        this.destroyList.push(body);
    }

    static update(gameTime) {
        for(var go of this.destroyList) {
            //gameObjectHandler.remove(go);
            this.world.DestroyBody(go.Body);
        }
        this.destroyList = [];
    }
}