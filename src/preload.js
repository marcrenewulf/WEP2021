class Preload extends Phaser.Scene {
    constructor() {
        super("PrepareSources");
    }

    preload() {
        //hintergund
        this.load.image("b1","./img/background/background1.png");
        this.load.image("b2","./img/background/background2.png");
        this.load.image("b3","./img/background/background3.png");
        this.load.image("c1","./img/background/cloud1.png");
        this.load.image("c2","./img/background/cloud2.png");
        this.load.image("c3","./img/background/cloud3.png");
        this.load.image("c4","./img/background/cloud4.png");
        this.load.image("c5","./img/background/cloud5.png");

        this.load.image("dirt", "./img/platform/DirtTiles16.png");
        this.load.tilemapTiledJSON("dirtmap","./img/platform/dirtmap.json");
    }

    create() {
        this.scene.start("startGame");
    }
}