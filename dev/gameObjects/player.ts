class Player implements GameObject {
    
    private x : number;
    private y : number;
    private rotation : number;
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
            this.turnLeft();
        });
    }

    public setShootBehavior(behavior : IshootBehavior) {
        this.shootBehavior = behavior;
    }

    public turnLeft() : void {
        this.rotation -= 3;
    }

    public update(): void {
        this.rectangle = this.div.getBoundingClientRect();
    }

    public draw(): void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) rotate("+this.rotation+"deg)";
    }
}