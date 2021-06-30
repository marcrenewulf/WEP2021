/** @type {import("../typings/matter")} */
/** @type {import("../typings/phaser")} */
/** @type {import("../typings/spine-canvas")} */
/** @type {import("../typings/spine-webgl")} */
/** @type {import("../typings/spine")} */
/** @type {import("../typings/SpineContainer")} */
/** @type {import("../typings/SpineGameObject")} */
/** @type {import("../typings/SpinePlugin")} */




let game = new Phaser.Game

var config = {
    type: Phaser.AUTO,
    width: 928,
    height: 600,
    scene: [Scene1, Scene2],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y:560},
            debug: true
        }
    }
};
var game = new Phaser.Game(config);

