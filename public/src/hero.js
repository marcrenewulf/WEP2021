class Hero extends Character {
    constructor(scene, playerInfo) {
        super(scene, playerInfo, "hero");
        this.speed = 110;
        this.aktSpeed = this.speed;
        this.attackCounter = 0;

        this.on("animationcomplete", function (anim) {
            this.emit("animationcomplete_" + anim.key);
        });
        this.on("animationcomplete_hero_attack1", this.attackEnded, this);
        this.on("animationcomplete_hero_attack2", this.attackEnded, this);
        this.on("animationcomplete_hero_attack3", this.attackEnded, this);
        this.on("animationcomplete_hero_jump0", this.attackEnded, this);

    }

    doAction() {
        super.doAction();
        if (!this.actionsBlocked) {
            switch (this.nextAction) {
                case "attack" :
                    this.attack();
                    break;
                case "dash" :
                    this.dash();
                    break;
                default :
                    super.playIdle();
                    break;
            }
            this.nextAction = "";
        }
    }

    attack() {
        this.attackCounter++;
        this.play("hero_attack" + this.attackCounter, true);
        if (this.attackCounter === 3) {
            this.attackCounter = 0;
        }
        this.actionsBlocked = true;
        this.aktSpeed = this.speed * 0.2;
    }

    dash() {
        this.aktSpeed = this.speed * 1.7;
        this.body.setVelocityX(this.aktSpeed * this.direction);
        this.play("hero_jump0", true);
        this.body.setSize(this.frame.width, this.frame.height);
        this.actionsBlocked = true;
    }

    //wird nach jeder Angriffsanimation aufgerufen
    attackEnded() {
        this.actionsBlocked = false;
        this.aktSpeed = this.speed;
        this.body.setSize(this.normalSize.x, this.normalSize.y);
    }
}
