class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, playerInfo, sprite) {
        super(scene, playerInfo.x, playerInfo.y, sprite);
        this.username = scene.add.text(playerInfo.x, playerInfo.y - 25, playerInfo.username, { font: '"Press Start 2P"' });
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.dmgHitbox = new DmgHitbox(scene, this);
        this.healthbar = new Healthbar(scene, this.x, this.y, 500);
        this.body.setSize(this.frame.width, this.frame.height);
        this.normalSize = {
            x : this.frame.width,
            y : this.frame.height
        }
        this.char = sprite;
        this.direction = 1;
        this.speed = 120;
        this.jumpHight = 250;
        this.jumpsMax = 2;
        this.jumpsLeft = 2;
        this.actionsBlocked = false;

        this.nextAction = "";

        this.on("animationcomplete", function (anim) {
            this.emit("animationcomplete_" + anim.key);
        });
    }

    move(direction) {
        if (!this.dead) {
            if (!this.actionsBlocked){
                this.setFlipX(-1 === direction);
                this.direction = direction;
            }
            this.body.setVelocityX(this.aktSpeed * direction);
            if (!this.actionsBlocked && this.body.onFloor()) {
                this.play(this.char+"_run", true);
            }
        }
    }

    stopMove() {
        if (this.body.onFloor()) {
            this.body.setVelocityX(0);
            let currentAnimation = this.anims.getName();
            if (currentAnimation === this.char + "_run" || currentAnimation === this.char + "_fall") {
                this.stop();
            }
        }
    }

    jump() {
        if (!this.actionsBlocked && this.jumpsLeft > 0 && !this.dead) {
            this.jumpsLeft--;
            this.body.setVelocityY(-this.jumpHight);
            this.play(this.char + "_jump" + this.jumpsLeft, true);
        }
    }

    playIdle() {
        if (!this.anims.isPlaying && !this.dead) {
            if (this.body.onFloor()) {
               this.play(this.char + "_idle", true);
            } else {
              this.play(this.char + "_fall", true);
            }
        }
    }

    bufferAction(action) {
        this.nextAction = action;
    }

    doAction() {
        if (this.body.onFloor()) {
            this.jumpsLeft = this.jumpsMax;
        }
    }

    die() {
        this.play(this.char + "_die");
        this.dead = true;
    }

}