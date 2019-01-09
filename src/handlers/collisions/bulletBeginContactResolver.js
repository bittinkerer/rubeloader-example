/***********************
 *  bulletBeginContactResolver  
 * ---------------------
 * Responsibility: Resolve bullet collisions on begin contact event
 * 
 **********************/
class bulletBeginContactResolver {
    

    static resolveCollision(collInfo) {
        var main = collInfo.main;
        var other = collInfo.other;
        var contact = collInfo.contact;

        if(other instanceof lava) {
            this.resolveCollisionWithLava(contact, main, other);
        } 
        else if(other instanceof platform) {
            this.resolveCollisionWithPlatform(main);
        } 
        else if(other instanceof asteroid) {
            this.resolveCollisionWithAsteroid(contact, main, other);
        }
        else if(other instanceof trackerEnemy) {
            this.resolveCollisionWithTrackerEnemy(contact, main, other);
        }
        else if(other instanceof floaterEnemy) {
            this.resolveCollisionWithFloaterEnemy(contact, main, other);
        }
        else if(other instanceof dropBomb) {
            this.resolveCollisionWithBomb(contact, main, other);
        }
    }

    static resolveCollisionWithBomb(contact, main, other) {
        main.Life = 0;
        other.life = 0;
        explosionHandler.addInfoOfExplosionToCreate( {position: other.Position});
    }

    static resolveCollisionWithLava(contact, main, other) {
        main.Life = 0;
    }

    static resolveCollisionWithSideWall(contact, main, other) {

    }
    
    static resolveCollisionWithFloaterEnemy(contact, main, other) {
        other.HealthBar.decrease(15);
        main.Life = 0;
    }

    static resolveCollisionWithTrackerEnemy(contact, main, other) {
        other.HealthBar.decrease(17);
        main.Life = 0;
    }

    static resolveCollisionWithShooterEnemy(shooterEnemy) {

    }

    static resolveCollisionWithAsteroid(contact, main, other) {
        other.HealthBar.decrease(20);
        main.Life = 0;
    }

    static resolveCollisionWithPlatform(main) {
        main.Life = 0;
    }
}