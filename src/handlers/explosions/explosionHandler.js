class explosionHandler {
    /*****************
     * METHODS
     *******************/
    static init(world) {
        explosionHandler.world = world;
        explosionHandler.explosions = [];
        explosionHandler.infoOfExplosionsToCreate = [];
    }

    static addInfoOfExplosionToCreate(explosionInfo) {
        if(!explosionInfo || !explosionInfo.position) {
            throw new Error('explosionInfo and explosionInfo.position cannot be null');
        }
        this.infoOfExplosionsToCreate.push(explosionInfo);
    }

    static update(gameTime) {
        for(var eInfo of this.infoOfExplosionsToCreate) {
            explosionHandler.explosions.push(
                new particleExplosion(this.world, eInfo.position, eInfo.arc, eInfo.startAngle, eInfo.blastPower || 40)
            );
        }
        this.infoOfExplosionsToCreate = [];

        for(var i = 0; i < this.explosions.length; ++i) {
            var expl = this.explosions[i];
            expl.update();
            if(expl.Killed) {
                this.explosions.splice(i, 1);
            }
        }
    }

    static draw(context, camera) {
        for(const expl of this.explosions) {
            for(const p of expl.particles) {
                p.draw(context, camera);
            }
        } 
    }
}