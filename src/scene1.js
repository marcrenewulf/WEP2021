class Scene1 extends Phaser.Scene {
    constructor() {
        super("startGame");
    }

    create() {
        this.platform = this.add.sprite(0,0, "platform");
    }

    update() {

    }
}