class LevelManager {

    private static _instance : LevelManager;
    private _levelNumber : number;

    private constructor() {
        this._levelNumber = 1;
    }

    public static getInstance() {
        if (! LevelManager._instance) {
            LevelManager._instance = new LevelManager()
            }
        return LevelManager._instance
    }

    public getNextLevel() {
        this._levelNumber++;
        return this._levelNumber;
    }
}