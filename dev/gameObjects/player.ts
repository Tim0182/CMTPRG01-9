class Player implements GameObject {
    
    private x : number;
    private y : number;
    private rotation : number;
    private angle : number = 6;
    private div : HTMLElement;
    private rectangle : ClientRect;
    private shootBehavior : IshootBehavior;
    public moving : boolean = false;
    
    constructor() {
        this.createPlayer();
    }

    private createPlayer() {
        this.div = document.createElement("player");
        document.body.appendChild(this.div);
        this.x = window.innerWidth / 12;
        this.y = window.innerHeight / 2 - this.div.clientHeight / 2;
        this.rotation = 270;
        this.shootBehavior = new SingleShot();

        cKeyboardInput.getInstance().addKeycodeCallback(37, () => {
            this.turn(-this.angle);
        });
        cKeyboardInput.getInstance().addKeycodeCallback(39, () => {
            this.turn(+this.angle);
        });

    }

    public setShootBehavior(behavior : IshootBehavior) {
        this.shootBehavior = behavior;
    }

    public turn(angle : number) : void {
        this.rotation += angle;
    }

    public update(): void {
        this.rectangle = this.div.getBoundingClientRect();
    }

    public draw(): void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) rotate("+this.rotation+"deg)";
    }
}