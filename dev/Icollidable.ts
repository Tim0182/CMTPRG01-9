interface Icollidable {
    collide(otherObject : Icollidable) : void;
    getRect() : ClientRect;
}