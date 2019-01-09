class physicsPolygon extends physicsObject {
    constructor(world, position, vertices, physicsInfo) {
        super(world, physicsInfo);
        var polyShape = new b2PolygonShape;
        polyShape.SetAsArray(vertices, vertices.length);
        this.fixtureDef.shape = polyShape;
        this.bodyDef.position.Set(position.x, position.y);
        this.body = world.CreateBody(this.bodyDef);
        this.fixture = this.body.CreateFixture(this.fixtureDef);

        if(physicsInfo && typeof(physicsInfo.gravityScale) == 'number') {
            //this.body.SetGravityScale(physicsInfo.gravityScale);
        }

        this.body.SetUserData(this);
    }

}