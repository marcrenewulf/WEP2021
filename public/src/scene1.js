class Scene1 extends Phaser.Scene {
    static LINKS = -1;
    static RECHTS = 1;
    constructor() {
        super("startGame");
    }

    create() {
        //hintergrund
        this.add.tileSprite(0,0, config.width, config.height, "b1").setOrigin(0, 0);
        this.add.tileSprite(0,0, config.width, config.height, "b2").setOrigin(0, 0);
        this.add.tileSprite(0,0, config.width, config.height, "b3").setOrigin(0, 0);
        this.c1 = this.add.tileSprite(0,0, config.width, config.height, "c1").setOrigin(0, 0);
        this.c2 = this.add.tileSprite(0,0, config.width, config.height, "c2").setOrigin(0, 0);
        this.c3 = this.add.tileSprite(0,0, config.width, config.height, "c3").setOrigin(0, 0);
        this.c4 = this.add.tileSprite(0,0, config.width, config.height, "c4").setOrigin(0, 0);
        this.c5 = this.add.tileSprite(0,0, config.width, config.height, "c5").setOrigin(0, 0);
        this.c6 = this.add.tileSprite(0,0, config.width, config.height, "c6").setOrigin(0, 0);
        this.c7 = this.add.tileSprite(0,0, config.width, config.height, "c7").setOrigin(0, 0);
        this.c8 = this.add.tileSprite(0,0, config.width, config.height, "c8").setOrigin(0, 0);

        //platformen
        const map = this.make.tilemap({key: 'dirtmap'});
        const tileset = map.addTilesetImage('DirtTiles16','dirt');
        this.platforms = map.createLayer('Platforms', tileset);
        this.platforms.setCollisionByProperty({collide: true});


        this.socket = io();


        this.socket.on('currentPlayers', function (players) {
            console.log("currentPlayers EVENT ausgelöst");
            Object.keys(players).forEach(function (id) {
                console.log("playerID: " + players[id].playerId + " | socketID: " + self.socket.id);
                if (players[id].playerId === self.socket.id) {
                    console.log("player erstellung");
                    // addPlayer(self, players[id]);
                    self.player = new Character(self, players[id]);
                    self.physics.add.collider(self.player, self.platforms);
                }else{
                    self.addOtherPlayers(self, players[id]);
                }
            });
        });


        this.socket.on('newPlayer', function (playerInfo) {
            self.addOtherPlayers(self, playerInfo);
        });

        this.otherPlayers = this.physics.add.group();



        this.socket.on('playerMoved', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    otherPlayer.setPosition(playerInfo.x, playerInfo.y);
                }
            });
        });



        this.socket.on('disconnected', function (playerId) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerId === otherPlayer.playerId) {
                    otherPlayer.destroy();
                }
            });
        });
        
        // //character
        // this.player = new Character(this, 200, 0);
        
        
        
        // //collider
        // this.physics.add.collider(this.player, platforms);


        

        //keyboard
        this.cursors = this.input.keyboard.createCursorKeys();
        this.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.action = this.input.keyboard.addKey("Q");

        var self = this;
    }

    //updateloop
    update() {
        this.moveClouds();
        
        if(this.player){
            this.playerControl();


            var x = this.player.x;
            var y = this.player.y;
            var r = this.player.rotation;

            if (this.player.oldPosition && (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y || r !== this.player.oldPosition.rotation)) {
                this.socket.emit('playerMovement', { x: this.player.x, y: this.player.y, rotation: this.player.rotation });
            }

            this.player.oldPosition = {
                x: this.player.x,
                y: this.player.y
              };
              
        }else{
            console.log("player doesnt exists");
        }
        
    }

    moveClouds(){
        this.c1.tilePositionX -= 0.03;
        this.c2.tilePositionX -= 0.2;
        this.c3.tilePositionX -= 0.08;
        this.c4.tilePositionX -= 0.21;
        this.c5.tilePositionX -= 0.09;
        this.c6.tilePositionX -= 0.16;
        this.c7.tilePositionX -= 0.18;
        this.c8.tilePositionX -= 0.09;
    }

    playerControl(){
        //movement
        if (this.cursors.left.isDown) {
            this.player.move(Scene1.LINKS);
        } else if (this.cursors.right.isDown) {
            this.player.move(Scene1.RECHTS);
        } else {
            this.player.stopMove();
        }

        //jump
        if (Phaser.Input.Keyboard.JustDown(this.jump)) {
            this.player.jump();
        }
    }

    addOtherPlayers(self, playerInfo) {
        console.log("addOtherPlayer()");
        const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'hero');
        otherPlayer.playerId = playerInfo.playerId;
        self.physics.add.collider(otherPlayer, self.platforms);
        self.otherPlayers.add(otherPlayer);

      }
}