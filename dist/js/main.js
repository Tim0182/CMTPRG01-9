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
        }, 0);
    };
    Game.prototype.intersects = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    Game.prototype.update = function () {
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.update();
        }
        KeyboardInput.getInstance().inputLoop();
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
var KeyboardInput = (function () {
    function KeyboardInput() {
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
    KeyboardInput.getInstance = function () {
        if (!KeyboardInput.instance) {
            KeyboardInput.instance = new KeyboardInput();
        }
        return KeyboardInput.instance;
    };
    return KeyboardInput;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Vector = (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.magnitude = function () {
            return Math.sqrt(_this.x * _this.x + _this.y * _this.y);
        };
        this.magSq = function () {
            return _this.x * _this.x + _this.y * _this.y;
        };
        this.normalize = function (magnitude) {
            if (magnitude === void 0) { magnitude = 1; }
            var len = Math.sqrt(_this.x * _this.x + _this.y * _this.y);
            _this.x /= len;
            _this.y /= len;
            return _this;
        };
        this.zero = function () {
            _this.x = 0;
            _this.y = 0;
        };
        this.copy = function (point) {
            _this.x = point.x;
            _this.y = point.y;
        };
        this.rotate = function (radians) {
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            var x = (cos * _this.x) + (sin * _this.y);
            var y = (cos * _this.y) - (sin * _this.x);
            _this.x = x;
            _this.y = y;
        };
        this.getAngle = function () {
            return Math.atan2(_this.y, _this.x);
        };
        this.multiply = function (value) {
            _this.x *= value;
            _this.y *= value;
        };
        this.add = function (value) {
            _this.x += value.x;
            _this.y += value.y;
        };
        this.subtract = function (value) {
            _this.x -= value.x;
            _this.y -= value.y;
        };
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
var Meteor = (function () {
    function Meteor() {
        this.createMeteor();
    }
    Meteor.prototype.getRect = function () {
        return this.rectangle;
    };
    Meteor.prototype.createMeteor = function () {
        var random = Math.floor(Math.random() * 3) + 1;
        this.div = document.createElement("meteor");
        this.div.className = "big" + random;
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
    Meteor.prototype.collide = function (otherObject) {
        if (otherObject instanceof Meteor) {
        }
        else if (otherObject instanceof Player) {
        }
    };
    Meteor.prototype.update = function () {
        this.move();
    };
    Meteor.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) rotate(" + this.rotation + "deg)";
        this.rectangle = this.div.getBoundingClientRect();
    };
    return Meteor;
}());
var Player = (function () {
    function Player() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.angle = 5;
        this.maxSpeed = 5;
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
        this.shootBehavior = new SingleShot();
        KeyboardInput.getInstance().addKeycodeCallback(37, function () {
            _this.turn(-_this.angle);
        });
        KeyboardInput.getInstance().addKeycodeCallback(39, function () {
            _this.turn(+_this.angle);
        });
        KeyboardInput.getInstance().addKeycodeCallback(38, function () {
            _this.accelerate();
        });
        KeyboardInput.getInstance().addKeycodeCallback(40, function () {
            _this.decelerate();
        });
    };
    Player.prototype.accelerate = function () {
        this.x += this.maxSpeed * Math.cos(this.rotation * Math.PI / 180);
        this.y += this.maxSpeed * Math.sin(this.rotation * Math.PI / 180);
    };
    Player.prototype.decelerate = function () {
    };
    Player.prototype.setShootBehavior = function (behavior) {
        this.shootBehavior = behavior;
    };
    Player.prototype.turn = function (angle) {
        this.rotation += angle;
        if (this.rotation >= 361) {
            this.rotation = 10;
        }
        else if (this.rotation <= 0) {
            this.rotation = 360;
        }
        console.log(this.rotation);
    };
    Player.prototype.collide = function (otherObject) {
        if (otherObject instanceof Meteor) {
            this.div.remove();
        }
    };
    Player.prototype.shootWeapon = function () {
        this.shootBehavior.shoot(this.x, this.y, this.rotation);
    };
    Player.prototype.update = function () {
        this.rectangle = this.div.getBoundingClientRect();
    };
    Player.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) rotate(" + this.rotation + "deg)";
    };
    return Player;
}());
var PowerUp = (function () {
    function PowerUp() {
    }
    return PowerUp;
}());
var MultiShot = (function () {
    function MultiShot() {
    }
    MultiShot.prototype.shoot = function (x, y, rotation) {
    };
    return MultiShot;
}());
var SingleShot = (function () {
    function SingleShot() {
    }
    SingleShot.prototype.shoot = function (x, y, rotation) {
    };
    return SingleShot;
}());
//# sourceMappingURL=main.js.map