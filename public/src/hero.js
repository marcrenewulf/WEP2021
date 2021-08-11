class Hero extends Character {
    constructor(scene, playerInfo) {
        super(scene, playerInfo, "hero");
        this.speed = 110;
        this.aktSpeed = this.speed;
        this.attackCounter = 0;


        this.on("animationcomplete_hero_attack1", this.attackEnded, this);
        this.on("animationcomplete_hero_attack2", this.attackEnded, this);
        this.on("animationcomplete_hero_attack3", this.attackEnded, this);
        this.on("animationcomplete_hero_jump0", this.attackEnded, this);

        this.on('animationupdate', function (anim, frame){
            if (["hero_attack1", "hero_attack2", "hero_attack3"].includes(anim.key)){
                this.placeDmgHitbox();
                if (anim.key === "hero_attack3") {
                    this.dmgHitbox.dmg += 1.2;
                }
                if (frame.index === 2) {
                    this.dmgHitbox.active = true;
                } else if (anim.key === "hero_attack1" && frame.index === 5) {
                    this.dmgHitbox.active = false;
                    this.dmgHitbox.resetDmg();
                } else {
                    this.dmgHitbox.active = false;
                    this.dmgHitbox.resetDmg();
                }
            }
        });
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

    placeDmgHitbox() {
        if (this.flipX) {
            this.dmgHitbox.body.reset(this.body.center.x - 11, this.body.center.y);
        } else {
            this.dmgHitbox.body.reset(this.body.center.x + 11, this.body.center.y);
        }
    }
}
