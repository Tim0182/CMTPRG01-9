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

        switch(random) {
            case 1:
                this.div = document.createElement("meteor");
                this.div.className = "big1";
                break;
            case 2:
                this.div = document.createElement("meteor");
                this.div.className = "big2";
                break;
            case 3:
                this.div = document.createElement("meteor");
                this.div.className = "big3";
                break;
        }

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

    private kys() : void {
        this.div.remove();
    }

    public collide(otherObject: Icollidable): void {
        if (otherObject instanceof Meteor) {
            console.log('Meteor collide met een meteor');
        } else if (otherObject instanceof Player) {
            console.log('Meteor collide met een player');
        }
    }

    public update() : void {
        this.move();
        this.rectangle = this.div.getBoundingClientRect();
        
    }

    public draw(): void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) rotate("+this.rotation+"deg)";
    }
}