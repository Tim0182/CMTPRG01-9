class Game {

    private static instance : Game;
    private gameObjects : Array<Meteor>;
    private player : Player;
    
    private constructor() {

        this.gameObjects = new Array<Meteor>();

        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());

        this.player = new Player();
        // this.gameObjects.push(this.player);

        requestAnimationFrame(() => this.update());
    }

    public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game()
            }
        return Game.instance
    }

    private checkCollision () {
        setTimeout(() => {

            for(let obj of this.gameObjects) {
                for(let item of this.gameObjects) {
                    if(obj !== item) {
                        if(this.intersects(obj.getRect(), item.getRect())) {
                            obj.kys();
                            item.kys();
                        }
                    }
                }
            }
     
            
        }, 2000);
    
    }

    // private intersectRect(r1 : ClientRect, r2 : ClientRect) {
    //     return !(r2.left > r1.right || 
    //             r2.right < r1.left || 
    //             r2.top > r1.bottom ||
    //             r2.bottom < r1.top);
    // }

    private intersects(a: ClientRect, b: ClientRect) {
        return !(b.left > a.right || 
            b.right < a.left || 
            b.top > a.bottom ||
            b.bottom < a.top);
    } 


    private update(){
        for(let obj of this.gameObjects) {
            obj.update();
        }
        cKeyboardInput.getInstance().inputLoop();
        this.checkCollision();
        this.draw();
    }

    private draw() {
        for(let obj of this.gameObjects) {
            obj.draw();
        }
        requestAnimationFrame(() => this.update());
    }

}