class Game {

    private gameObjects     : Array<GameObject>;
    
    constructor() {
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