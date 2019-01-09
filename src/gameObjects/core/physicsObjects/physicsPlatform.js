class physicsPlatform extends physicsObject {
    constructor(world, position, width, physicsOptions) {
        super(physicsOptions);
        var edgeShape = new b2PolygonShape;
        this.body = world.CreateBody(this.bodyDef);
        edgeShape.SetAsBox(width/2, 0.5);
        this.fixtureDef.shape = edgeShape;
        this.body.CreateFixture(this.fixtureDef);
        this.body.SetPosition(position);
        this.body.SetUserData(this);
    }

    get Position() {
        return this.body.GetPosition();
    }

    
}