interface GameObject {
    update() : void;
    draw() : void;
    collide(otherObject : GameObject) : void;
    getRect() : ClientRect;
}