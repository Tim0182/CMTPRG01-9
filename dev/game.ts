class Game {

    private static instance : Game;
    private level : Level;
    
    private constructor() {

        this.level = new Level(1);

        requestAnimationFrame(() => this.update());
    }

    public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game()
            }
        return Game.instance
    }

    private update(){
        KeyboardInput.getInstance().inputLoop();
        this.level.update();
        this.draw();
    }

    private draw() {
        this.level.draw();
        requestAnimationFrame(() => this.update());
    }

}