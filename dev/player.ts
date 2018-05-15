class Player implements GameObject {
    
    public x : number;
    public y : number;
    public div : HTMLElement;
    private shootBehavior : IshootBehavior;
    
    constructor() {
        this.createPlayer();
    }

    private createPlayer() {
        this.div = document.createElement("player");
        document.body.appendChild(this.div);
        this.x = 250;
        this.y = window.innerHeight / 2 - this.div.clientHeight;
        this.shootBehavior = new SingleShot();
    }

    public setShootBehavior(behavior : IshootBehavior) {
        this.shootBehavior = behavior;
    }

    public update(): void {
        this.shootBehavior.shoot();
        this.setShootBehavior(new MultiShot());
        this.shootBehavior.shoot();
    }

    public draw(): void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) rotate(270deg)";
    }
}