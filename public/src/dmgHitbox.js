class DmgHitbox extends Phaser.GameObjects.Sprite {

    constructor(scene, object) {
        super(scene, object.body.x, object.body.y);
        this.debugShowBody = true;
        this.setOrigin(0.5, 0.5);
        this.active = false;
        this.origdmg = 40;
        this.dmg = this.origdmg;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.isCircle = true;
        this.body.setCircle(15);
        this.body.allowGravity = false;
    }

    resetDmg() {
        this.dmg = this.origdmg
    }
}