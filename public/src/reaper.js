//Hier ist noch nix fertig, gibt erstmal nur einen Charakter
class Reaper extends Character {
    constructor(scene, playerInfo){
        super(scene, playerInfo, "reaper");
        this.body.setOffset(19,18);
    }

    doAction(){
        super.doAction();
        if (this.nextAction === "attack") {
            this.attack();
        }
        this.nextAction = "";
    }

    attack() {
        this.play("reaperdash", true);
    }
}