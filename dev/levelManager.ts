class LevelManager {

    private static _instance : LevelManager;
    private _levelNumber : number;

    private constructor() {
        this._levelNumber = 1;
    }

    public static getInstance() : LevelManager {
        if (! LevelManager._instance) {
            LevelManager._instance = new LevelManager()
            }
        return LevelManager._instance
    }

    public getCurrentLevel() : number {
        return this._levelNumber;
    }

    public getNextLevel() : number {
        this._levelNumber++;
        return this._levelNumber;
    }
}