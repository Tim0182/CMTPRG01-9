var Game = (function () {
    function Game() {
        var _this = this;
        this.gameObjects = new Array();
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Meteor());
        this.gameObjects.push(new Player());
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
var Meteor = (function () {
    function Meteor() {
        this.createMeteor();
    }
    Meteor.prototype.getRect = function () {
        return this.rectangle;
    };
    Meteor.prototype.createMeteor = function () {
        this.div = document.createElement("meteor");
        document.body.appendChild(this.div);
        this.x = Math.floor((Math.random() * window.innerWidth) + 1);
        this.y = Math.floor((Math.random() * window.innerHeight) + 1);
        this.rotation = 0;
        this.xSpeed = Math.random() < 0.5 ?
            Math.random() - 1 * 1.5 :
            Math.random() * 1.5;
        this.ySpeed = Math.random() < 0.5 ?
            Math.random() - 1 * 1.5 :
            Math.random() * 1.5;
        this.rotationSpeed = Math.random() * 2;
    };
    Meteor.prototype.move = function () {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.rotation += this.rotationSpeed;
        if (this.x + this.div.clientWidth < 0) {
            this.x = window.innerWidth;
        }
        if (this.x > window.innerWidth) {
            this.x = 0 - this.div.clientWidth;
        }
        if (this.y + this.div.clientHeight < 0) {
            this.y = window.innerHeight;
        }
        if (this.y > window.innerHeight) {
            this.y = 0 - this.div.clientHeight;
        }
    };
    Meteor.prototype.update = function () {
        this.move();
        this.rectangle = this.div.getBoundingClientRect();
    };
    Meteor.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) rotate(" + this.rotation + "deg)";
    };
    return Meteor;
}());
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