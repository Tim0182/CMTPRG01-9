interface Icollidable {
    collide(otherObject : GameObject) : void;
    getRect() : ClientRect;
}