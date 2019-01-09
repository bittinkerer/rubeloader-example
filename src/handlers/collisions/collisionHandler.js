/***********************
 * collisionHandler  
 *      detects collisions and delegate appropriate response to the collision resolver
 *  Input: world (from physics engine) 
 * 
 **/
class collisionHandler {
    constructor(world) {
        this.world = world;

        // init contact listener
        this.contactListener = new b2ContactListener;
        this.contactListener.BeginContact = (contact) => { this.beginContact(contact); };
        this.contactListener.EndContact = (contact) => { this.endContact(contact); }

        this.world.SetContactListener(this.contactListener);
    }

    /*****************
     * PROPERTIES
     *******************/
    get ContactListener() {
        return this.contactListener;
    }

    /*****************
     * METHODS
     *******************/
    beginContact(contact) {
        // Get the two objects that form the collision
        var bodyA = contact.GetFixtureA().GetBody().GetUserData();
        var bodyB = contact.GetFixtureB().GetBody().GetUserData();

        if(bodyA.onCollision) {
            bodyA.onCollision(contact.GetFixtureB().GetBody(), bodyB.collisionInfo);
        }

        if(bodyB.onCollision) {
            bodyB.onCollision(contact.GetFixtureA().GetBody(), bodyA.collisionInfo);
        }
    }

    endContact(contact) {
        // Get the two objects that form the collision
        var bodyA = contact.GetFixtureA().GetBody().GetUserData();
        var bodyB = contact.GetFixtureB().GetBody().GetUserData();

        

    }

    

}