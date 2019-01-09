class gameObject {
    constructor(drawableObject, physicsObject, options, onDeath) {
        this.drawableObject = drawableObject;
        this.physicsObject = physicsObject;
        this.physicsObject.body.SetUserData(this);
        this.options = options || {};

        this.healthBar = new bar(
            new b2Vec2(1, 3999), 
            new b2Vec2(150, 8), 
            options ? options.hp : Number.MAX_VALUE, 
            { strokeStyle: '#000', fillStyle: '#d9f7e0' },
            onDeath
        );
    }
    
    /*****************
     * PROPERTIES
     *******************/
    get Name() {
        return this.options.name || '';
    }

    get HealthBar() {
        return this.healthBar;
    }

    get Alive() {
        return this.healthBar.Fill > 0;
    }

    get Position() {
        return this.physicsObject.body.GetPosition();
    }

    get Body() {
        return this.physicsObject.body;
    }

    get UserData() {
        return this.Body.GetUserData();
    }

    set UserData(value) {
        this.Body.SetUserData(value);
    } 

    /*****************
     * METHODS
     *******************/
    update(gameTime) {
        
    }

    draw(context, camera) {
        this.drawableObject.draw(context, camera, this.Position);
    }

    die() {
        this.healthBar.empty();
    }

}