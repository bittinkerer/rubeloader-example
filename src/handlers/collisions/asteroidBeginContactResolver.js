class asteroidBeginContactResolver {
    static resolveCollision(collInfo) {
        var main = collInfo.main;
        var other = collInfo.other;
        var contact = collInfo.contact;

        if(other instanceof particle) {
            this.resolveCollisionWithParticle(contact, main, other);
        }
        else if(other instanceof enemy) {
            this.resolveCollisionWithEnemy(contact, main, other);
        }
    }

    static resolveCollisionWithParticle(contact, main, other) {
        other.life = 0;
        main.HealthBar.decrease(other.Damage);
    }

    static resolveCollisionWithEnemy(contact, main, other) {
        main.die();
        explosionHandler.addInfoOfExplosionToCreate({ position: main.Position });
    }
}