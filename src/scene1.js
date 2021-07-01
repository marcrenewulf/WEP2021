class Scene1 extends Phaser.Scene {
    constructor() {
        super("startGame");
    }

    create() {
        {
            const map = this.make.tilemap({key: 'dirtmap'});
            const tileset = map.addTilesetImage('DirtTiles16','dirt');
            const platforms = map.createLayer('Platforms', tileset);
            platforms.setCollisionByProperty({collide: true});
        }
    }

    update() {

    }
}