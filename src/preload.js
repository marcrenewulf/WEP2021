class Preload extends Phaser.Scene {
    constructor() {
        super("PrepareSources");
    }

    preload() {

        this.load.image("dirt", "./img/platform/DirtTiles16.png");
        this.load.tilemapTiledJSON("dirtmap","./img/platform/dirtmap.json");
    }

    create() {
        this.scene.start("startGame");
    }
}