

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'canvasDiv',
        zoom: Phaser.Scale.MAX_ZOOM,
        width: 720,
        height: 460,
    },

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

