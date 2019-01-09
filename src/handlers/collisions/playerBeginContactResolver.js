/***********************
 *  playerBeginContactResolver  
 * ---------------------
 * Responsibility: Resolve player collisions on begin contact event
 * 
 **********************/
class playerBeginContactResolver {
    constructor(collInfo) {
        //this.player = collInfo.player;
        //this.other = collInfo.other;
        //this.contact = collInfo.contact;
    }

    static resolveCollision(collInfo) {
        var player = collInfo.player;
        var other = collInfo.other;
        var contact = collInfo.contact;

        if(other instanceof lava) {
            this.resolveCollisionWithLava(contact, player, other);
        } 
        else if(other instanceof platform) {
            this.resolveCollisionWithPlatform(player);
        } 
        else if(other instanceof asteroid) {
            this.resolveCollisionWithAsteroid(contact, player, other);
        }
        else if(other instanceof dropBomb) {
            this.resolveCollisionWithBomb(contact, player, other);
        }
        else if(other instanceof particle) {
            this.resolveCollisionWithParticle(contact, player, other);
        } 
        else if(other instanceof enemy) {
            this.resolveCollisionWithEnemy(contact, player, other);
        }
        
    }

    static resolveCollisionWithLava(contact, player, other) {
        player.Body.ApplyImpulse(new b2Vec2(0, 350), player.Body.GetWorldCenter());
        player.HealthBar.decrease(35);
    }

    static resolveCollisionWithBomb(contact, player, other) {
        player.HealthBar.decrease(10);
        other.life = 0;
    }

    static resolveCollisionWithSideWall(contact, player, other) {

    }
    
    static resolveCollisionWithParticle(contact, player, other) {
        player.HealthBar.decrease(2);
    }

    static resolveCollisionWithEnemy(contact, player, other) {
        player.HealthBar.decrease(7);
        other.HealthBar.decrease(40);
    }

    static resolveCollisionWithTrackerEnemy(contact, player, other) {
        player.HealthBar.decrease(7);
        other.HealthBar.decrease(20);
    }

    static resolveCollisionWithShooterEnemy(shooterEnemy) {

    }

    static resolveCollisionWithAsteroid(contact, player, other) {
        player.HealthBar.decrease(16);
        other.die();
    }

    static resolveCollisionWithPlatform(player) {
        player.Body.ApplyImpulse(new b2Vec2(0, 500), player.Body.GetWorldCenter());        
    }
}