class Healthbar {

    constructor (scene, x, y, value)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.health = value;
        this.value = value;
        this.p = 0.06;

        this.draw();

        scene.add.existing(this.bar);
    }

    updatePosition(x, y){
        this.x = x;
        this.y = y;
        this.draw()
    }

    delete(){
        console.log("löschen")
        this.bar.destroy();
        super.delete();
    }

    updateHealth (health)
    {
        this.value = health;

        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    draw ()
    {
        this.bar.clear();

        // BG
        this.bar.fillStyle(0x0c0000);
        this.bar.fillRect(this.x, this.y, this.health * this.p + 2, 4);

        //  Health

        this.bar.fillStyle(0x0c1122);
        this.bar.fillRect(this.x + 1, this.y + 1, this.health * this.p, 2);

        if (this.value < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            // this.bar.fillStyle(0x00ff00);
            this.bar.fillStyle(0xff0000);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 1, this.y + 1, d, 2);
    }

}