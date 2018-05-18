class SingleShot implements IshootBehavior {
    public shoot(x: number, y: number, rotation: number): void {
        new Bullet(x, y, rotation);
    }
}