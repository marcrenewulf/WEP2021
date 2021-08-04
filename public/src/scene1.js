class Scene1 extends Phaser.Scene {
    static LINKS = -1;
    static RECHTS = 1;

    constructor() {
        super("startGame");
    }

    create() {
        //hintergrund
        this.add.tileSprite(0, 0, config.width, config.height, "b1").setOrigin(0, 0);
        this.add.tileSprite(0, 0, config.width, config.height, "b2").setOrigin(0, 0);
        this.add.tileSprite(0, 0, config.width, config.height, "b3").setOrigin(0, 0);
        this.c1 = this.add.tileSprite(0, 0, config.width, config.height, "c1").setOrigin(0, 0);
        this.c2 = this.add.tileSprite(0, 0, config.width, config.height, "c2").setOrigin(0, 0);
        this.c3 = this.add.tileSprite(0, 0, config.width, config.height, "c3").setOrigin(0, 0);
        this.c4 = this.add.tileSprite(0, 0, config.width, config.height, "c4").setOrigin(0, 0);
        this.c5 = this.add.tileSprite(0, 0, config.width, config.height, "c5").setOrigin(0, 0);
        this.c6 = this.add.tileSprite(0, 0, config.width, config.height, "c6").setOrigin(0, 0);
        this.c7 = this.add.tileSprite(0, 0, config.width, config.height, "c7").setOrigin(0, 0);
        this.c8 = this.add.tileSprite(0, 0, config.width, config.height, "c8").setOrigin(0, 0);

        //platformen
        const map = this.make.tilemap({key: 'dirtmap'});
        const tileset = map.addTilesetImage('DirtTiles16', 'dirt');
        this.platforms = map.createLayer('Platforms', tileset);
        this.platforms.setCollisionByProperty({collide: true});

        //Physics Group for Other Players
        this.otherPlayers = this.physics.add.group();

        //keyboard
        this.cursors = this.input.keyboard.createCursorKeys();
        this.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.action = this.input.keyboard.addKey("Q");

        //Eventhandler für Spieler beitritt
        this.socket = io();

        //Aktuelle Spieler und sich selbst hinzufügen
        this.socket.on('currentPlayers', function (players) {
            Object.keys(players).forEach(function (id) {
                if (players[id].playerId === self.socket.id) {
                    self.player = new Character(self, players[id]);
                    self.physics.add.collider(self.player, self.platforms);
                } else {
                    self.addOtherPlayers(self, players[id]);
                }
            });
        });

        //Neue Speieler hinzufügen
        this.socket.on('newPlayer', function (playerInfo) {
            self.addOtherPlayers(self, playerInfo);
        });

        //Andere Spieler bewegen
        this.socket.on('playerMoved', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    otherPlayer.setPosition(playerInfo.x, playerInfo.y);
                    otherPlayer.setFlipX(playerInfo.direction === -1);
                }
            });
        });

        //Animationen von anderen abspielen
        this.socket.on('playerNewAnimation', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    otherPlayer.play(playerInfo.animation);
                }
            });
        })

        this.socket.on('disconnected', function (playerId) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerId === otherPlayer.playerId) {
                    otherPlayer.destroy();
                }
            });
        });

        var self = this;
    }

    //updateloop
    update() {
        this.moveClouds();

        //player movement
        if (this.player) {
            this.player.refresh();
            this.playerControl();
            this.emitPlayerMovement();
        } else {
            console.log("player doesnt exists");
        }

    }

    moveClouds() {
        this.c1.tilePositionX -= 0.03;
        this.c2.tilePositionX -= 0.2;
        this.c3.tilePositionX -= 0.08;
        this.c4.tilePositionX -= 0.21;
        this.c5.tilePositionX -= 0.09;
        this.c6.tilePositionX -= 0.16;
        this.c7.tilePositionX -= 0.18;
        this.c8.tilePositionX -= 0.09;
    }

    playerControl() {
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
        const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'hero');
        otherPlayer.playerId = playerInfo.playerId;
        self.physics.add.collider(otherPlayer, self.platforms);
        self.otherPlayers.add(otherPlayer);
    }

    emitPlayerMovement() {
        var x = this.player.x;
        var y = this.player.y;
        var d = this.player.direction;

        if (this.player.oldPosition && (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y || d !== this.player.oldPosition.direction)) {
            this.socket.emit('playerMovement', {x: this.player.x, y: this.player.y, direction: this.player.direction});
        }

        this.player.oldPosition = {
            x: this.player.x,
            y: this.player.y,
            direction: this.player.direction
        };
    }

    emitNewPlayerAnimation(anim) {
        this.socket.emit('playerAnimation', {animation : anim});
    }
}