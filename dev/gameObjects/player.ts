class Player implements GameObject {
    
    private x : number;
    private y : number;
    private div : HTMLElement;
    private rectangle : ClientRect;
    private shootBehavior : IshootBehavior;
    
    constructor() {
        this.createPlayer();
    }

    private createPlayer() {
        this.div = document.createElement("player");
        document.body.appendChild(this.div);
        this.x = window.innerWidth / 12;
        this.y = window.innerHeight / 2 - this.div.clientHeight / 2;
        this.shootBehavior = new SingleShot();
    }

    public setShootBehavior(behavior : IshootBehavior) {
        this.shootBehavior = behavior;
    }

    public update(): void {
        this.rectangle = this.div.getBoundingClientRect();
    }

    public draw(): void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) rotate(270deg)";
    }
}