class physicsObject {
    constructor(world, physicsInfo) {
        if(this.constructor == physicsObject) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        if(!world) {
            throw new Error(`to instantiate ${nameof({physicsObject})}, world cannot be null`);
        }

        this.world = world;
        this.bodyDef = new b2BodyDef();
        this.fixtureDef = new b2FixtureDef;

        physicsInfo = physicsInfo || {};
        
        // set fixtureDef properties
        this.fixtureDef.friction = physicsInfo.friction || 1.0;
        this.fixtureDef.density = physicsInfo.density || 1.0;
        this.fixtureDef.restitution = physicsInfo.restitution || 0.0;
        this.fixtureDef.filter.groupIndex = physicsInfo.groupIndex || 0;
        this.fixtureDef.isSensor = physicsInfo.isSensor === true ? true : false;
        if(physicsInfo.categoryBits) {
            this.fixtureDef.filter.categoryBits = physicsInfo.categoryBits;
        }
        if(physicsInfo.maskBits) {
            this.fixtureDef.filter.maskBits = physicsInfo.maskBits;
        }
        // set bodyDef properties
        this.bodyDef.linearDamping = physicsInfo.linearDamping || 0.0;
        this.bodyDef.angularDamping = physicsInfo.angularDamping || 0.1;
        this.bodyDef.fixedRotation = physicsInfo.fixedRotation || false;
        this.bodyDef.bullet = physicsInfo.bullet || false;        
        this.bodyDef.type = physicsInfo.type || b2Body.b2_staticBody;
        if(physicsInfo.linearVelocity) {
            this.bodyDef.linearVelocity = physicsInfo.linearVelocity;
        }
        if(physicsInfo.angularVelocity) {
            this.bodyDef.angularVelocity = physicsInfo.angularVelocity;
        }
        
    }

    get World() {
        return this.world;
    }
}