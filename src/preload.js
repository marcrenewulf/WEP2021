class Preload extends Phaser.Scene {
    constructor() {
        super("PrepareSources");
    }

    preload() {
        this.load.image("platform","./img/platform");
    }

    create() {
        this.scene.start("startGame");
    }
}