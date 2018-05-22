class Level {

    private _gameObjects : Array<GameObject>;

    constructor(levelnr : number) {

        this._gameObjects = new Array<GameObject>();

        // Spawn asteroids, amount equals level * 3
        for (let i = 0; i < levelnr * 3; i++) {
            let meteor = new Meteor();
            this._gameObjects.push(meteor);
        }

        // Spawn players
        let player = new Player(this);
        this._gameObjects.push(player);

        // Spawn powerups
        let powerup = new PowerUp();
        this._gameObjects.push(powerup);
    }

    private checkCollision() {
        for (let obj of this._gameObjects) {

        }
    }

    public addGameObject(obj : GameObject) {
        this._gameObjects.push(obj);
    }

    public update() {
        for (let obj of this._gameObjects) {
            obj.update();
        }
    }

    public draw() {
        for (let obj of this._gameObjects) {
            obj.draw();
        }
    }
}