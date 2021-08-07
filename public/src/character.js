class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, playerInfo, sprite) {
        super(scene, playerInfo.x, playerInfo.y, sprite = "reaper");
        this.username = playerInfo.username;
        scene.add.text(playerInfo.x, playerInfo.y - 20, this.username, { font: '"Press Start 2P"' });
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body
            .setSize(this.frame.width, this.frame.height, false)
            .setOffset(18, 8);
        this.char = sprite;
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
            this.play(this.char+"run", true);
            console.log(this.char+"run");
        }
    }

    stopMove() {
        if (this.body.onFloor()) {
            this.body.setVelocityX(0);
            let currentAnimation = this.anims.getName();
            if (currentAnimation === this.char + "run" || currentAnimation === this.char + "fall") {
                this.stop();
            }
        }
        this.playIdle();
    }

    jump() {
        if (this.jumpsLeft > 0) {
            this.jumpsLeft--;
            this.body.setVelocityY(-this.jumpHight);
            this.play(this.char + "jump" + this.jumpsLeft, true);
        }
    }

    playIdle() {
        if (!this.anims.isPlaying) {
            if (this.body.onFloor()) {
               this.play(this.char + "idle", true);
            } else {
              this.play(this.char + "fall", true);
            }
        }
    }

    refresh() {
        if (this.body.onFloor()) {
            this.jumpsLeft = this.jumpsMax;
        }
    }

}