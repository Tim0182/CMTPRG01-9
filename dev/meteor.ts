class Meteor implements GameObject {
    
    private x : number;
    private y : number;
    private rotation : number;
    private rotationSpeed : number;
    private div : HTMLElement;
    private rectangle : ClientRect;

    constructor() {
        this.createMeteor();
    }

    private createMeteor() {
        this.div = document.createElement("meteor");
        document.body.appendChild(this.div);
        this.x = 100;
        this.y = 200;
        this.rotation = 0;
        this.rotationSpeed = Math.random()
    }
    
    public update(): void {
        this.rotation += this.rotationSpeed;
        this.rectangle = this.div.getBoundingClientRect();
    }

    public draw(): void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) rotate("+this.rotation+"deg)";
    }
}