class Game {

    private static instance : Game;

    private gameObjects     : Array<GameObject>;
    
    private constructor() {

        this.gameObjects = new Array<GameObject>();

        let player : Player = new Player();
        this.gameObjects.push(player);
        let meteor : Meteor = new Meteor();
        this.gameObjects.push(meteor);

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