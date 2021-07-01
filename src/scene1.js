class Scene1 extends Phaser.Scene {
    constructor() {
        super("startGame");
    }

    create() {
        //hintergrund und platformen erstellen
        this.b1 = this.add.tileSprite(0,0, config.width, config.height, "b1");
        this.b1.setOrigin(0, 0);
        this.b2 = this.add.tileSprite(0,0, config.width, config.height, "b2");
        this.b2.setOrigin(0, 0);
        this.b3 = this.add.tileSprite(0,0, config.width, config.height, "b3");
        this.b3.setOrigin(0, 0);
        this.c1 = this.add.tileSprite(0,0, config.width, config.height, "c1");
        this.c1.setOrigin(0, 0);
        this.c2 = this.add.tileSprite(0,0, config.width, config.height, "c2");
        this.c2.setOrigin(0, 0);
        this.c3 = this.add.tileSprite(0,0, config.width, config.height, "c3");
        this.c3.setOrigin(0, 0);
        this.c4 = this.add.tileSprite(0,0, config.width, config.height, "c4");
        this.c4.setOrigin(0, 0);
        this.c5 = this.add.tileSprite(0,0, config.width, config.height, "c5");
        this.c5.setOrigin(0, 0);






        const map = this.make.tilemap({key: 'dirtmap'});
        const tileset = map.addTilesetImage('DirtTiles16','dirt');
        const platforms = map.createLayer('Platforms', tileset);
        platforms.setCollisionByProperty({collide: true});
    }

    update() {
        this.moveClouds();
    }

    moveClouds(){
        this.c1.tilePositionX -= 0.1;
        this.c2.tilePositionX -= 0.3;
        this.c3.tilePositionX -= 0.1;
        this.c4.tilePositionX -= 0.3;
        this.c5.tilePositionX -= 0.2;
    }
}