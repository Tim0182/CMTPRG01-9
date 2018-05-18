class Player implements GameObject, Icollidable {
    
    private x : number = 0;
    private y : number = 0;
    private rotation : number = 0;
    private angle : number = 5;
    private div : HTMLElement;
    private rectangle : ClientRect;
    private shootBehavior : IshootBehavior;
    private maxSpeed: number = 5;
    
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
        this.shootBehavior = new SingleShot();

        // Left arrow key
        KeyboardInput.getInstance().addKeycodeCallback(37, () => {
            this.turn(-this.angle);
        });

        // Right arrow key
        KeyboardInput.getInstance().addKeycodeCallback(39, () => {
            this.turn(+this.angle);
        });

        // Up arrow key
        KeyboardInput.getInstance().addKeycodeCallback(38, () => {
            this.accelerate();
        });

        // Down arrow key
        KeyboardInput.getInstance().addKeycodeCallback(40, () => {
            this.decelerate();
        });

    }

    private accelerate() {
        this.x += this.maxSpeed * Math.cos(this.rotation * Math.PI / 180);
        this.y += this.maxSpeed * Math.sin(this.rotation * Math.PI / 180);
    }

    private decelerate() {

    }

    public setShootBehavior(behavior : IshootBehavior) {
        this.shootBehavior = behavior;
    }

    public turn(angle : number) : void {
        this.rotation += angle;

        if (this.rotation >= 361) {
            this.rotation = 10;
        } else if (this.rotation <= 0) {
            this.rotation = 360;
        }

        console.log(this.rotation);
    }

    public collide(otherObject: Icollidable): void {
        if (otherObject instanceof Meteor) {
            this.div.remove();
        }
    }

    private shootWeapon() {
        this.shootBehavior.shoot(this.x, this.y, this.rotation);
    }

    public update(): void {
        this.rectangle = this.div.getBoundingClientRect();
    }

    public draw(): void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) rotate("+this.rotation+"deg)";
    }
}