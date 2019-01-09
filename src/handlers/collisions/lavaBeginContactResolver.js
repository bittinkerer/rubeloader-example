class lavaBeginContactResolver {
    static resolveCollision(collInfo) {
        var main = collInfo.main;
        var other = collInfo.other;
        var contact = collInfo.contact;

        if(other instanceof asteroid) {
            this.resolveCollisionWithAsteroid(contact, main, other);
        }
        else if(other instanceof enemy) {
            this.resolveCollisionWithEnemy(contact, main, other);
        }
        else if(other instanceof dropBomb) {
            this.resolveCollisionWithParticle(contact, main, other);
        }
    }

    static resolveCollisionWithAsteroid(contact, main, asteroid) {
        explosionHandler.addInfoOfExplosionToCreate( {position: asteroid.Position});
        asteroid.Life = 0;
    }

    static resolveCollisionWithEnemy(contact, main, other) {
        explosionHandler.addInfoOfExplosionToCreate( {position: other.Position});
        other.HealthBar.empty();
    }

    static resolveCollisionWithParticle(contact, main, other) {
        explosionHandler.addInfoOfExplosionToCreate( {position: other.Position});
        other.life = 0;
    }
}