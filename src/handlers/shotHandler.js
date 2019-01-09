/*****************
 * SHOT_HANDLER :
 * manages shots in the game
 ********************/
class shotHandler {
    /*****************
     * METHODS
     *******************/
    static init(world) {
        shotHandler.world = world;
        shotHandler.shots = [];
        shotHandler.infoOfShotsToCreate = [];
    }

    static addInfoOfShotToCreate(shotInfo) {
        if(!shotInfo) {
            throw new Error('shotInfo cannot be null');
        }
        this.infoOfShotsToCreate.push(shotInfo);
    }

    static update(gameTime) {
        for(var sinfo of this.infoOfShotsToCreate) {
            shotHandler.shots.push(
                new bullet(this.world, sinfo)
            );
        }
        this.infoOfShotsToCreate = [];

        for(var i = 0; i < this.shots.length; ++i) {
            var s = this.shots[i];
            s.update(gameTime);
            if(!s.Alive) {
                this.shots.splice(i, 1);
            }
        }
    }

    static draw(context, camera) {
        for(const s of this.shots) {
            s.draw(context, camera);
        } 
    }
}