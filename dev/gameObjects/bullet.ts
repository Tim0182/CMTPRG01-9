class Bullet implements GameObject, Icollidable {

    private x : number;
    private y : number;
    private rotation : number;
    private speed : number = 10;

    private div : HTMLElement;
    private rectangle : ClientRect;

    constructor(x : number, y : number, rotation : number) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;

        this.div = document.createElement("bullet");
        document.body.appendChild(this.div);
    }

    public collide(otherObject: Icollidable): void {
        if (otherObject instanceof Meteor) {

        }
    }

    private move() {
        this.x += this.speed * Math.cos(this.rotation * Math.PI / 180);
        this.y += this.speed * Math.sin(this.rotation * Math.PI / 180);
    }

    public getRect(): ClientRect {
        throw new Error("Method not implemented.");
    }

    public update(): void {
        this.move();
    }

    public draw(): void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) rotate("+this.rotation+"deg)";
    }
}