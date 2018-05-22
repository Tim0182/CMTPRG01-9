class Meteor implements GameObject, Icollidable {
    
    private x : number;
    private y : number;
    private rotation : number;

    private xSpeed : number;
    private ySpeed : number;
    private rotationSpeed : number;

    private div : HTMLElement;
    private rectangle : ClientRect;

    public getRect() : ClientRect {
        return this.rectangle;
    }

    constructor() {
        this.createMeteor();
    }

    private createMeteor() {

        let random = Math.floor(Math.random() * 3) + 1;

        this.div = document.createElement("meteor");
        this.div.className = "big" + random;

        document.body.appendChild(this.div);

        this.x = Math.floor((Math.random() * window.innerWidth) + 1);
        this.y = Math.floor((Math.random() * window.innerHeight) + 1);
        this.rotation = 0;

        this.xSpeed = Math.random() < 0.5 ?
        Math.random() - 1 * 1.5 :
        Math.random() * 1.5;
        
        this.ySpeed = Math.random() < 0.5 ?
        Math.random() - 1 * 1.5 :
        Math.random() * 1.5;

        this.rotationSpeed = Math.random()*2;
    }

    private move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.rotation += this.rotationSpeed;

        if (this.x + this.div.clientWidth < 0) {
            this.x = window.innerWidth;
        }

        if (this.x > window.innerWidth) {
            this.x = 0 - this.div.clientWidth;
        }
        
        if (this.y + this.div.clientHeight < 0) {
            this.y = window.innerHeight;
        }

        if (this.y > window.innerHeight) {
            this.y = 0 - this.div.clientHeight;
        }
    }

    public collide(otherObject: GameObject): void {
        if (otherObject instanceof Meteor) {
            
        } else if (otherObject instanceof Player) {
            
        }
    }

    public removeAsteroid() : void {
        this.div.remove();
    }

    public update() : void {
        this.move();
        
    }

    public draw(): void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) rotate("+this.rotation+"deg)";
        this.rectangle = this.div.getBoundingClientRect();
    }
}