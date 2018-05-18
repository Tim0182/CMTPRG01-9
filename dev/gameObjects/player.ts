class Player implements GameObject, Icollidable {
    
    private x : number;
    private y : number;
    private rotation : number;
    private angle : number = 6;
    private div : HTMLElement;
    private rectangle : ClientRect;
    private shootBehavior : IshootBehavior;
    public moving : boolean = false;
    
    public getRect(): ClientRect {
        return this.rectangle;
    }

    constructor() {
        this.createPlayer();
    }

    private createPlayer() {
        this.div = document.createElement("player");
        document.body.appendChild(this.div);
        this.x = window.innerWidth / 2 - this.div.clientWidth / 2;
        this.y = window.innerHeight / 2 - this.div.clientHeight / 2;
        this.rotation = 0;
        this.shootBehavior = new SingleShot();

        cKeyboardInput.getInstance().addKeycodeCallback(37, () => {
            this.turn(-this.angle);
        });
        cKeyboardInput.getInstance().addKeycodeCallback(65, () => {
            this.turn(-this.angle);
        });

        cKeyboardInput.getInstance().addKeycodeCallback(39, () => {
            this.turn(+this.angle);
        });
        cKeyboardInput.getInstance().addKeycodeCallback(68, () => {
            this.turn(+this.angle);
        });

    }

    public setShootBehavior(behavior : IshootBehavior) {
        this.shootBehavior = behavior;
    }

    public turn(angle : number) : void {
        this.rotation += angle;
    }

    public collide(otherObject: Icollidable): void {
        if (otherObject instanceof Meteor) {
            console.log('Player collide met een meteor');
        }
    }

    public update(): void {
        this.rectangle = this.div.getBoundingClientRect();
    }

    public draw(): void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) rotate("+this.rotation+"deg)";
    }
}