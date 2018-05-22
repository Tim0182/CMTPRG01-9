class SingleShot implements IshootBehavior {
    public shoot(x: number, y: number, rotation: number): void {
        Level.addGameObject(new Bullet(x, y, rotation));
    }
}