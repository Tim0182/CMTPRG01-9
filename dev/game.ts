class Game {

    private static instance : Game;
    private gameObjects : Array<GameObject>;
    private player : Player;
    private level : number = 1;
    
    private constructor() {

        this.gameObjects = new Array<GameObject>();

        for (let i = 0; i < 5; i++) {
            let meteor = new Meteor();
            this.gameObjects.push(meteor);
          }

          let powerup = new PowerUp();
          this.gameObjects.push(powerup);

        this.player = new Player();
        this.gameObjects.push(this.player);

        requestAnimationFrame(() => this.update());
    }


    // If there are no more asteroids, return false
    private countAsteroids() {
        for (let obj of this.gameObjects) {
            if (obj instanceof Meteor) {
                return true;
            }
            break;
        }
        return false;
    }

    public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game()
            }
        return Game.instance
    }

    private checkCollision () {
        for(let obj of this.gameObjects) {
            for(let item of this.gameObjects) {
                if(obj !== item) {
                    if(this.intersects(obj.getRect(), item.getRect())) {
                        obj.collide(item);
                    }
                }
            }
        }
    }

    public addGameObject(obj : GameObject) {
        this.gameObjects.push(obj);
    }

    public removeGameObject(obj : GameObject) {
        let index = this.gameObjects.indexOf(obj);
        this.gameObjects.splice(index, 1);
    }

    private intersects(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
        b.left <= a.right &&
        a.top <= b.bottom &&
        b.top <= a.bottom)
       } 
       
    private update(){
        for(let obj of this.gameObjects) {
            obj.update();
        }
        KeyboardInput.getInstance().inputLoop();
        this.draw();
    }

    private draw() {
        for(let obj of this.gameObjects) {
            obj.draw();
        }
        this.checkCollision();
        requestAnimationFrame(() => this.update());
    }

}