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

    private update(){
        for(let obj of this.gameObjects) {
            obj.update();
        }
        this.draw();
    }

    private draw() {
        for(let obj of this.gameObjects) {
            obj.draw();
        }
        requestAnimationFrame(() => this.update());
    }

}