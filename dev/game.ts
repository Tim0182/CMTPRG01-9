class Game {

    private static instance : Game;

    private gameObjects     : Array<GameObject>;
    
    private constructor() {

        this.gameObjects = new Array<GameObject>();

        // let audio = new Audio('./../bgm/sc2.mp3');
        // audio.play();


        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Player());

        requestAnimationFrame(() => this.update());
    }

    public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game()
            }
        return Game.instance
    }

    // private checkCollision() {
    //     for(let item of this.gameObjects) {
    //         for(let obj of this.gameObjects)  {
    //             if (item === obj) {
                    
    //             } else {
                    
    //             }
    //         }
    //     }
    // }

    private update(){
        for(let obj of this.gameObjects) {
            obj.update();
        }
        this.draw();
        // this.checkCollision();
    }

    private draw() {
        for(let obj of this.gameObjects) {
            obj.draw();
        }
        requestAnimationFrame(() => this.update());
    }

}