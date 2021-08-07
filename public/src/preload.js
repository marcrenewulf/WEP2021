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
        this.load.image("c6","./img/background/cloud6.png");
        this.load.image("c7","./img/background/cloud7.png");
        this.load.image("c8","./img/background/cloud8.png");

        this.load.image("dirt", "./img/platform/DirtTiles16.png");
        this.load.tilemapTiledJSON("dirtmap","./img/platform/dirtmap.json");

        //aseprite datein
        this.load.aseprite("reaper","./img/characters/reaper/reaper.png","./img/characters/reaper/reaper.json");
        this.load.aseprite("hero","./img/characters/hero/hero.png","./img/characters/hero/hero.json");
        //this.load.aseprite("redhood","./img/characters/redhood/redhood.png","./img/characters/redhood/redhood.json");
    }

    create() {
        //aseprite animationen

        this.anims.createFromAseprite("reaper");
        this.anims.createFromAseprite("hero");
        //this.anims.createFromAseprite("redhood");


        this.scene.start("startGame");
    }
}