/*
 * Parameters:
 *  world       -> box2d game world
 *  position    -> position in sim coordinates
 *  radius      -> radius in sim units
 *  physicsInfo -> physical properties of object
 */
class physicsCircle extends physicsObject {
    constructor(world, position, radius, physicsInfo) {
        super(world, physicsInfo);
        var circleShape = new b2CircleShape;
        circleShape.SetRadius(radius);
        this.fixtureDef.shape = circleShape;
        this.bodyDef.position.Set(position.x, position.y);
        this.body = world.CreateBody(this.bodyDef);
        this.fixture = this.body.CreateFixture(this.fixtureDef);
        this.body.SetUserData(this);
    }
}