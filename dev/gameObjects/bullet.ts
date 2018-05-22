class Bullet implements GameObject {

    private x : number;
    private y : number;
    private rotation : number;
    private speed : number = 10;

    private div : HTMLElement;
    private rectangle : ClientRect;

    constructor(x : number, y : number, rotation : number) {

        this.div = document.createElement("bullet");
        document.body.appendChild(this.div);

        this.x = x;
        this.y = y;
        this.rotation = rotation;
    }

    public collide(otherObject: GameObject): void {
        if (otherObject instanceof Meteor) {
            otherObject.removeAsteroid();
            this.remove();
        }
    }

    private move() {
        this.x += this.speed * Math.cos(this.rotation * Math.PI / 180);
        this.y += this.speed * Math.sin(this.rotation * Math.PI / 180);
    }

    private checkBoundaries() {
        if (this.x + this.div.clientWidth < 0) {
            this.remove();
        }

        if (this.x > window.innerWidth) {
            this.remove();
        }
        
        if (this.y + this.div.clientHeight < 0) {
            this.remove();
        }

        if (this.y > window.innerHeight) {
            this.remove();
        }
    }

    private remove() : void {
        this.div.remove();
        Level.removeGameObject(this);
    }

    public getRect(): ClientRect {
        return this.rectangle;
    }

    public update(): void {
        this.move();
        this.checkBoundaries();
    }

    public draw(): void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) rotate("+this.rotation+"deg)";
        this.rectangle = this.div.getBoundingClientRect();
    }
}