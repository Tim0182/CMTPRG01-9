class PowerUp implements GameObject, Icollidable {

    private x : number = 0;
    private y : number = 0;
    private div : HTMLElement;
    private rectangle : ClientRect;

    constructor() {
        this.x = Math.floor((Math.random() * window.innerWidth) + 1) - 0.5;
        this.y = Math.floor((Math.random() * window.innerHeight) + 1) - 0.5;

        this.div = document.createElement("powerup");
        document.body.appendChild(this.div);
    }

    public collide(otherObject: Icollidable): void {
        if (otherObject instanceof Player) {
            otherObject.setShootBehavior(new MultiShot());
            this.div.remove();
        }
        
    }

    public getRect(): ClientRect {
        return this.rectangle;
    }

    public update(): void {
        
    }
    
    public draw(): void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px)";
        this.rectangle = this.div.getBoundingClientRect();
    }

}