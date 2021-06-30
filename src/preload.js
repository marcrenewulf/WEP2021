class Preload extends Phaser.Scene {
    constructor() {
        super("PrepareSources");
    }

    preload() {
        this.load.image("platform","./img/platform/platform.png");
    }

    create() {
        this.scene.start("startGame");
    }
}