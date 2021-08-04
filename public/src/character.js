class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, playerInfo) {
        super(scene, playerInfo.x, playerInfo.y, "hero");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.direction = 1;
        this.speed = 120;
        this.jumpHight = 250;
        this.jumpsMax = 2;
        this.jumpsLeft = 2;
        this.state = {
            idlestate : true,
            attackstate : false
        }
        this.scene = scene;

        this.on("animationstart", function(anim) {
            this.scene.emitNewPlayerAnimation(anim)
        });
    }

    move(direction) {
        if (!this.state.attackstate){
            this.setFlipX(-1 === direction);
            this.direction = direction;
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
            if (currentAnimation === "run" || currentAnimation === "fall") {
                this.stop();
            }
        }
        this.playIdle();
    }

    jump() {
        if (this.jumpsLeft > 0) {
            console.log("sprünge vorher: "+ this.jumpsLeft);
            this.jumpsLeft--;
            console.log("sprünge nachher: "+ this.jumpsLeft);
            this.body.setVelocityY(-this.jumpHight);
            this.play("jump" + this.jumpsLeft, true);
            console.log("nach animation: " + this.jumpsLeft);
        }
    }

    playIdle() {
        if (!this.anims.isPlaying) {
            if (this.body.onFloor()) {
                this.play("idle-2", true);
            } else {
                this.play("fall", true);
            }
        }
    }

    refresh() {
        if (this.body.onFloor()) {
            console.log(this.body.onFloor());
            this.jumpsLeft = this.jumpsMax;
        }
    }

}