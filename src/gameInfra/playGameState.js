/**
 * playGameState : 
 *      this is the starting logic of the game, 
 *      this is the coordinator and delegator
 *  Input: (canvas, userInput, homeState)
 *      canvas - HTML5 canvas
 *      userInput - handles user input and actions for this state of the game
 *      homeState - homeState is the initial game state when game starts
 */
class playGameState extends gameState {
    constructor(canvas, userInput, homeState) {
        super();
        this.canvas = canvas;
        this._userInput = userInput;
        this.homeState = homeState;
        this.continueMenu = new continueGameMenu(canvas,
            () => { this.init(); },
            () => { homeState(); },
            this._userInput
        );
        //this.pauseGameMenu = pauseGameMenu;
        this.player = null;
        this.camera = null;

        this.writer = new textWriter(
            { font: 'bold 12px arial', color: '#5a5a5a', context: canvas.getContext('2d') }
        );

        this.fps = 0;
        this.init();
    }

    init() {
        // create world
        this.world = new b2World(
            new b2Vec2(0, -4.6),    //gravity
            true                    //allow sleep
        );

        this.collisionHandler = new collisionHandler(this.world);

        // init handlers
        deadBodiesHandler.init(this.world);
        explosionHandler.init(this.world);
        shotHandler.init(this.world);
        gameObjectHandler.init(this.world);

        // Set convert units
        var worldHeightInPixels = this.canvas.height;
        var worldWidthInPixels = this.canvas.width;
        
        this.simToPixelRatio = 20;                              // 20 sim-units per pixel 
        this.worldHeight = this.simToPixelRatio * worldHeightInPixels;// world height in sim units
        this.worldWidth = worldWidthInPixels * this.simToPixelRatio;      // world width in sim units
        this.screenWidth = canvas.width * this.simToPixelRatio;           // screen width in sim units
        this.screenHeight = canvas.height * this.simToPixelRatio;         // screen height in sim units
        convert.init(worldHeightInPixels / this.worldHeight,
            new b2Vec2(this.worldWidth, this.worldHeight),
            new b2Vec2(this.screenWidth, this.screenHeight));

        // init camera
        this.camera = new Camera(new b2Vec2(0, 0), new b2Vec2(canvas.width, canvas.height),
            new b2Vec2(worldWidthInPixels, worldHeightInPixels));

        
        // Walls - position passed is center position

        gameObjectHandler.add( // left wall
            new gameObject(
                new drawablePoly(drawablePoly.rectVertices(new b2Vec2(100, this.worldHeight)),
                    { fillStyle: "#ffaea0", strokeStyle: "#d82000" }),
                new physicsPolygon(
                    this.world,
                    new b2Vec2(50, this.worldHeight / 2),
                    drawablePoly.rectVertices(new b2Vec2(100, this.worldHeight))
                ),
                { name: 'wall-left' }
            )
        );
        
        gameObjectHandler.add( // right wall
            new gameObject(
                new drawablePoly(drawablePoly.rectVertices(new b2Vec2(0.50, this.worldHeight)),
                    { fillStyle: "#ffaea0", strokeStyle: "#d82000" }),
                new physicsPolygon(
                    this.world,
                    new b2Vec2(71.7, this.worldHeight / 2),
                    drawablePoly.rectVertices(new b2Vec2(0.50, this.worldHeight))
                ),
                { name: 'wall-right' }
            )
        );

        gameObjectHandler.add( // top wall
            new gameObject(
                new drawablePoly(drawablePoly.rectVertices(new b2Vec2(this.worldWidth, 0.50)),
                    { fillStyle: "#22e2e2", strokeStyle: "#000" }
                ),
                new physicsPolygon(
                    this.world,
                    new b2Vec2(this.worldWidth / 2, this.worldHeight - 0.25),
                    drawablePoly.rectVertices(new b2Vec2(this.worldWidth, 0.50))
                ),
                { name: 'wall-top' }
            )
        );

        gameObjectHandler.add( // bottom wall
            new gameObject(
                new drawablePoly(drawablePoly.rectVertices(new b2Vec2(this.worldWidth, 0.50)),
                    { fillStyle: "#22e2e2", strokeStyle: "#000" }
                ),
                new physicsPolygon(
                    this.world,
                    new b2Vec2(this.worldWidth / 2, 4),
                    drawablePoly.rectVertices(new b2Vec2(this.worldWidth, 0.50))
                ),
                { name: 'wall-top' }
            )
        );
        

        // Handle Input
        this.inputHandler = new playInputHandler(this.player);
    }

    update(gameTime) {
        // calc fps
        this.fps = 1 / gameTime;

        // Execute Handlers
        explosionHandler.update(gameTime);
        deadBodiesHandler.update(gameTime);
        shotHandler.update(gameTime);
        gameObjectHandler.update(gameTime);

        // World tick
        this.world.Step(1 / 60, 8, 3);

        

        this.world.ClearForces();
    }

    draw(context) {
        // set background color
        context.fillStyle = "#edf9ff";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // draw handlers
        explosionHandler.draw(context, this.camera);
        shotHandler.draw(context, this.camera);
        gameObjectHandler.draw(context, this.camera);

    }

}