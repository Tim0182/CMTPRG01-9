class Game {

    private gameObjects     : Array<GameObject>;
    
    constructor() {

        this.gameObjects = new Array<GameObject>();

        let player : Player = new Player();
        this.gameObjects.push(player);

        requestAnimationFrame(() => this.update());
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