//Hier ist noch nix fertig, gibt erstmal nur einen Charakter
class Reaper extends Character {
    constructor(scene, playerInfo){
        super(scene, playerInfo, "reaper");
        this.body.setOffset(19,18);
        this.speed = 110;
        this.aktSpeed = this.speed;
        this.attackCounter = 0;
        this.dmgHitbox.origdmg = 50;
        this.dmgHitbox.dmg = 50;
        this.allowDash = true;


        //Callbacks für Dinge die während einer Animation geändert werden müssen
        this.on("animationcomplete_reaper_dash", this.attackEnded, this);
        this.on("animationcomplete_reaper_attack1", this.attackEnded, this);
        this.on("animationcomplete_reaper_attack2", this.attackEnded, this);

        this.on('animationupdate', function (anim, frame){
            if (["reaper_dash"].includes(anim.key)){
                this.placeDmgHitbox();
                if (frame.index === 4) {
                    this.dash2();
                } else if (frame.index === 6) {
                    this.dash3();
                }
            }
        });

    }

    doAction() {
        super.doAction();
        if (!this.actionsBlocked && !this.dead) {
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

        this.play("reaper_attack" + this.attackCounter, true);
        if (this.attackCounter === 2) {
            this.attackCounter = 0;
        }
        this.actionsBlocked = true;
        this.aktSpeed = this.speed * 0.7;

    }

    dash() {
        if (this.allowDash) {
            this.dmgHitbox.deactivateFor = [];
            this.movementBlocked = true;
            this.actionsBlocked = true;
            this.body.setAllowGravity(false);
    
            this.body.setVelocityX(0);
            this.body.setVelocityY(this.body.velocity.y * 0.2);
            this.play("reaper_dash", true);
            this.body.setSize(this.frame.width, this.frame.height);
            this.jumpsLeft = this.jumpsMax;
            this.allowDash = false;
            this.scene.time.delayedCall(2000, function(){self.allowDash = true, this});
        }
    }

    dash2() {
        this.body.setVelocityX(this.aktSpeed * this.direction * 9);
        this.dmgHitbox.active = true;
    }

    dash3() {
        this.body.setVelocityX(0);
        this.dmgHitbox.active = false;
    }

    //wird nach jeder Angriffsanimation aufgerufen
    attackEnded() {
        this.body.setAllowGravity(true);
        this.movementBlocked = false;
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