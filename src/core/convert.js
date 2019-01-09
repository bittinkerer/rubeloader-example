class convert {
    static init(scale, worldSize, screenSize) {
        convert.scale = scale;
        convert.worldSize = worldSize; // in sim units
        convert.screenSize = screenSize; // in sim units
    }

    static get WorldWidth() {
        return this.worldSize.x;
    }

    static get WorldHeight() {
        return this.worldSize.y;        
    }

    static get ScreenWidth() {
        return this.screenSize.x;
    }

    static get ScreenHeight() {
        return this.screenSize.y;
    }

    static toDisplayUnits(v) {
        if(v == undefined || v == null) {
            throw "Parameter is not defined";
        }

        if(isNaN(v)) {
            return new b2Vec2(v.x * this.scale, v.y * this.scale);
        }
        return v * this.scale;
    }

    static toDisplayUnitsWithOffset(v) {
        if(v == undefined || v == null) {
            throw "Parameter not defined";
        }

        return this.getOffsetWithDispUnits(this.toDisplayUnits(v));
    }

    static toSimUnits(v) {
        if(v == undefined || v == null) {
            throw "Parameter is not defined";
        }
        
        if(isNaN(v)) {
            return new b2Vec2(v.x / this.scale, v.y / this.scale);
        }
        return v / this.scale;
    }

    static toSimUnitsWithOffset(v) {
        if(v == undefined || v == null) {
            throw "Parameter not defined";
        }

        return this.getOffset(this.toSimUnits(v));
    }


    static getOffset(pos) {
        return new b2Vec2(pos.x - 0, Math.abs(pos.y - this.WorldHeight));
    }

    static getOffsetWithDispUnits(pos) {
        return new b2Vec2(pos.x - 0, Math.abs(pos.y - this.toDisplayUnits(this.WorldHeight)));
    }
}