class drawableRect extends drawablePoly {
    constructor(size, options) {
        // set vertices provided size from center 
        var halfWidth = size.x / 2;
        var halfHeight = size.y / 2;
        var vertices = [ 
            new b2Vec2(-halfWidth, halfHeight), 
            new b2Vec2(halfWidth, halfHeight), 
            new b2Vec2(halfWidth, -halfHeight), 
            new b2Vec2(-halfWidth, -halfHeight) 
        ];
        super(vertices, options);
    }

}