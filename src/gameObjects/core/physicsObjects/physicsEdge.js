class physicsEdge extends physicsObject {
    constructor(world, verts, physicsOptions) {
        super(world, physicsOptions);
        this.body = world.CreateBody(this.bodyDef);
        this.fixtures = [];
        
        for(var i = 0; i < verts.length -1; ++i) {
            var edgeShape = new b2PolygonShape;
            edgeShape.SetAsEdge(verts[i], verts[i+1]);                        
            this.fixtureDef.shape = edgeShape;
            this.fixtures.push(this.body.CreateFixture(this.fixtureDef));
        }
        
        this.body.SetUserData(this);
    }

    
}