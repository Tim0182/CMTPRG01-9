class Level {

    private _gameObjects : Array<GameObject>;
    private static instance : Level;

    constructor(levelnr : number) {

        this._gameObjects = new Array<GameObject>();
        Level.instance = this;


        // Spawn asteroids, amount equals level * 4 - 1
        for (let i = 0; i < levelnr * 4 - 1; i++) {
            let meteor = new Meteor();
        }

        // Spawn players
        let player = new Player(this);

        // Spawn powerups
        let powerup = new PowerUp();
    }

    // Execute appropriate functions when objects collide
    private checkCollision () {
        for(let obj of this._gameObjects) {
            for(let item of this._gameObjects) {
                if(obj !== item) {
                    if(this.intersects(obj.getRect(), item.getRect())) {
                        obj.collide(item);
                    }
                }
            }
        }
    }

    // Look for any Meteor objects in the GameObjects Array
    private countAsteroids() {
        for (let obj of this._gameObjects) {
            if (obj instanceof Meteor) {
                return true;
            }
            break;
        }
        return false;
    }

    // Let Game know the level is cleared
    // private checkProgress() {
    //     if (!this.countAsteroids()) {
    //         let winEvent = new CustomEvent('win');
    //         window.dispatchEvent(winEvent);
    //     }
    // }

    // Check if two objects are inside of each other using client rectangles
    private intersects(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
        b.left <= a.right &&
        a.top <= b.bottom &&
        b.top <= a.bottom)
    }

    // Add GameObjects to the level GameObjects array
    static addGameObject(obj : GameObject) {
        Level.instance._gameObjects.push(obj);
    }

    // Remove GameObjects from the level GameObjects array
    static removeGameObject(obj : GameObject) {
        let index = Level.instance._gameObjects.indexOf(obj);
        Level.instance._gameObjects.splice(index, 1);
    }

    public update() {
        for (let obj of this._gameObjects) {
            obj.update();
        }
        // this.checkProgress();
    }

    public draw() {
        for (let obj of this._gameObjects) {
            obj.draw();
        }
        this.checkCollision();
    }
}