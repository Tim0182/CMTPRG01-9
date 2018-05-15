var Game = (function () {
    function Game() {
        var _this = this;
        this.gameObjects = new Array();
        var player = new Player();
        this.gameObjects.push(player);
        requestAnimationFrame(function () { return _this.update(); });
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.update = function () {
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.update();
        }
        this.draw();
    };
    Game.prototype.draw = function () {
        var _this = this;
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.draw();
        }
        requestAnimationFrame(function () { return _this.update(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Player = (function () {
    function Player() {
        this.createPlayer();
    }
    Player.prototype.createPlayer = function () {
        this.div = document.createElement("player");
        document.body.appendChild(this.div);
        this.x = window.innerWidth / 12;
        this.y = window.innerHeight / 2 - this.div.clientHeight / 2;
        this.shootBehavior = new SingleShot();
    };
    Player.prototype.setShootBehavior = function (behavior) {
        this.shootBehavior = behavior;
    };
    Player.prototype.update = function () {
        this.rectangle = this.div.getBoundingClientRect();
    };
    Player.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) rotate(270deg)";
    };
    return Player;
}());
var MultiShot = (function () {
    function MultiShot() {
    }
    MultiShot.prototype.shoot = function () {
    };
    return MultiShot;
}());
var SingleShot = (function () {
    function SingleShot() {
    }
    SingleShot.prototype.shoot = function () {
    };
    return SingleShot;
}());
//# sourceMappingURL=main.js.map