class ClusterShot implements IshootBehavior {
    private i : number = 0;
    public shoot(x: number, y: number, rotation: number): void {
        for(this.i = 0; this.i < 10; this.i++) {
            Level.addGameObject(new Bullet(x, y, rotation = Math.floor(Math.random() * 361)));
        }
    }
}