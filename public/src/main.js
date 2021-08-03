/** @type {import("../typings/matter")} */
/** @type {import("../typings/phaser")} */
/** @type {import("../typings/spine-canvas")} */
/** @type {import("../typings/spine-webgl")} */
/** @type {import("../typings/spine")} */
/** @type {import("../typings/SpineContainer")} */
/** @type {import("../typings/SpineGameObject")} */
/** @type {import("../typings/SpinePlugin")} */

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'canvasDiv'
    },
    width: 720,
    height: 460,
    scene: [Preload, Scene1],
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

