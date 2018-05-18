var Game = (function () {
    function Game() {
        var _this = this;
        this.gameObjects = new Array();
        this.gameCollidables = new Array();
        for (var i = 0; i < 5; i++) {
            var meteor = new Meteor();
            this.gameObjects.push(meteor);
            this.gameCollidables.push(meteor);
        }
        this.player = new Player();
        this.gameObjects.push(this.player);
        this.gameCollidables.push(this.player);
        requestAnimationFrame(function () { return _this.update(); });
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.checkCollision = function () {
        var _this = this;
        setTimeout(function () {
            for (var _i = 0, _a = _this.gameCollidables; _i < _a.length; _i++) {
                var obj = _a[_i];
                for (var _b = 0, _c = _this.gameCollidables; _b < _c.length; _b++) {
                    var item = _c[_b];
                    if (obj !== item) {
                        if (_this.intersects(obj.getRect(), item.getRect())) {
                            obj.collide(item);
                        }
                    }
                }
            }
        }, 2000);
    };
    Game.prototype.intersects = function (a, b) {
        return !(b.left > a.right ||
            b.right < a.left ||
            b.top > a.bottom ||
            b.bottom < a.top);
    };
    Game.prototype.update = function () {
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.update();
        }
        cKeyboardInput.getInstance().inputLoop();
        this.checkCollision();
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
var cKeyboardInput = (function () {
    function cKeyboardInput() {
        var _this = this;
        this.keyCallback = {};
        this.keyDown = {};
        this.keyboardDown = function (event) {
            event.preventDefault();
            _this.keyDown[event.keyCode] = true;
        };
        this.keyboardUp = function (event) {
            _this.keyDown[event.keyCode] = false;
        };
        this.addKeycodeCallback = function (keycode, f) {
            _this.keyCallback[keycode] = f;
            _this.keyDown[keycode] = false;
        };
        this.inputLoop = function () {
            for (var key in _this.keyDown) {
                var is_down = _this.keyDown[key];
                if (is_down) {
                    var callback = _this.keyCallback[key];
                    if (callback != null) {
                        callback();
                    }
                }
            }
        };
        document.addEventListener('keydown', this.keyboardDown);
        document.addEventListener('keyup', this.keyboardUp);
    }
    cKeyboardInput.getInstance = function () {
        if (!cKeyboardInput.instance) {
            cKeyboardInput.instance = new cKeyboardInput();
        }
        return cKeyboardInput.instance;
    };
    return cKeyboardInput;
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
        var random = Math.floor(Math.random() * 3) + 1;
        switch (random) {
            case 1:
                this.div = document.createElement("meteor");
                this.div.className = "big1";
                break;
            case 2:
                this.div = document.createElement("meteor");
                this.div.className = "big2";
                break;
            case 3:
                this.div = document.createElement("meteor");
                this.div.className = "big3";
                break;
        }
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
    Meteor.prototype.kys = function () {
        this.div.remove();
    };
    Meteor.prototype.collide = function (otherObject) {
        if (otherObject instanceof Meteor) {
            console.log('Meteor collide met een meteor');
        }
        else if (otherObject instanceof Player) {
            console.log('Meteor collide met een player');
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
        this.angle = 6;
        this.moving = false;
        this.createPlayer();
    }
    Player.prototype.getRect = function () {
        return this.rectangle;
    };
    Player.prototype.createPlayer = function () {
        var _this = this;
        this.div = document.createElement("player");
        document.body.appendChild(this.div);
        this.x = window.innerWidth / 2 - this.div.clientWidth / 2;
        this.y = window.innerHeight / 2 - this.div.clientHeight / 2;
        this.rotation = 0;
        this.shootBehavior = new SingleShot();
        cKeyboardInput.getInstance().addKeycodeCallback(37, function () {
            _this.turn(-_this.angle);
        });
        cKeyboardInput.getInstance().addKeycodeCallback(65, function () {
            _this.turn(-_this.angle);
        });
        cKeyboardInput.getInstance().addKeycodeCallback(39, function () {
            _this.turn(+_this.angle);
        });
        cKeyboardInput.getInstance().addKeycodeCallback(68, function () {
            _this.turn(+_this.angle);
        });
    };
    Player.prototype.setShootBehavior = function (behavior) {
        this.shootBehavior = behavior;
    };
    Player.prototype.turn = function (angle) {
        this.rotation += angle;
    };
    Player.prototype.collide = function (otherObject) {
        if (otherObject instanceof Meteor) {
            console.log('Player collide met een meteor');
        }
    };
    Player.prototype.update = function () {
        this.rectangle = this.div.getBoundingClientRect();
    };
    Player.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) rotate(" + this.rotation + "deg)";
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