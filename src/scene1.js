class Scene1 extends Phaser.Scene {
    constructor() {
        super("startGame");
    }

    create() {
        {
            let platform = this.add.sprite(config.width / 2, config.width / 2, "platform");
            this.platforms = this.physics.add.staticGroup(platform);
        }
    }

    update() {

    }
}