class Character extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "hero");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = 120;
        this.jumpHight = 250;
        this.jumpsMax = 2;
        this.jumps = 1;
        this.state = {
            idlestate : true,
            attackstate : false
        }
    }

    move(direction) {
        if (!this.state.attackstate){
            this.setFlipX(-1 === direction);
        }
        this.body.setVelocityX(this.speed * direction);
        if (this.body.onFloor()) {
            this.play("run", true);
        }
    }

    stopMove() {
        if (this.body.onFloor()) {
            this.body.setVelocityX(0);
            let currentAnimation = this.anims.getName();
            if (currentAnimation === "run" ||currentAnimation === "fall") {
                this.stop();
            }
        }
        this.playIdle();
    }

    jump() {
        if (this.jumps <= this.jumpsMax) {
            this.body.setVelocityY(-this.jumpHight);
            this.play("jump"+this.jumps, true);
            this.jumps++;
        }
    }

    playIdle() {
        if (!this.anims.isPlaying) {
            if (this.body.onFloor()) {
                this.play("idle-2", true);
                this.jumps = 1;
            } else {
                this.play("fall", true);
            }
        }
    }
}