import BaseScene from "./BaseScene";

class PlayScene extends BaseScene {
  constructor(config) {
    super("PlayScene", { ...config, canGoBack: true });

    this.player = null;
    this.player2 = null;
    this.hitbox = null;
    this.hitbox2 = null;

    this.velocityY = -400;
  }

  create() {
    super.create();
    this.createStar();
    //Music
    this.playMusic = this.sound.add("playMusic", { loop: false });
    this.playMusic.play();

    //animations
    //fly
    this.createFlyAnim();
    //attack
    this.createAttackAnim();
    //chill
    this.createChillAnim();
    //player Sprites
    this.createP1Sprite();
    this.createP2Sprite();
    //Player Hitboxes
    this.createP1Hitbox();
    this.createP2Hitbox();
    //collider
    this.createP1HitboxOnP2();
    this.createP2HitboxOnP1();
    // Score

    //Controls
    this.handleP1Inputs();
    this.handleP2Inputs();
    //
  }

  update() {
    this.playerOutiseChecker();
  }
  // Create functions
  // Sound Effects
  birdFlapSE() {
    this.birdFlap = this.sound.add("birdFlap", { loop: false });
    this.birdFlap.play();
  }
  blockPlacedSE() {
    this.blockPlaced = this.sound.add("blockPlaced", { loop: false });
    this.blockPlaced.play();
  }
  // onHitSE() {
  //   this.blockHit = this.sound.add("blockHit", { loop: false });
  //   this.blockHit.play();
  // }
  // onHitSEStopp() {
  //   this.blockHit = this.sound.add("blockHit", { loop: false });
  //   this.blockHit.stop();
  // }

  //GameLogic
  createBG() {
    this.add.image(0, 0, "bg").setOrigin(0);
  }
  createStar() {
    this.star = this.physics.add
      .image(500, 100, "star")
      .setScale(2)
      .setVisible(false)
      .setScale(4);

    this.star.body.setAllowGravity(false);
  }

  createFlyAnim() {
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("playerFly", {
        start: 0,
        end: 2,
      }),
      frameRate: 16,
      repeat: 2,
    });
  }

  createAttackAnim() {
    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("playerAttack", {
        start: 0,
        end: 2,
      }),
      frameRate: 16,
      repeat: 0,
    });
  }

  createChillAnim() {
    this.anims.create({
      key: "chill",
      frames: this.anims.generateFrameNumbers("playerFly", {
        start: 0,
        end: 0,
      }),
      frameRate: 16,
      repeat: 0,
    });
  }

  createP1Sprite() {
    this.player = this.physics.add
      .sprite(
        this.config.player1position.x,
        this.config.player1position.y,
        "playerFly",
        "assets/playerFly.png"
      )
      .setScale(4);

    this.player.setBodySize(this.player.width * 0.25, this.player.height * 0.7);
    this.player.setTint(0xff0000);
    // this.player.body.setAllowGravity(false);
  }

  createP2Sprite() {
    this.player2 = this.physics.add
      .sprite(
        this.config.player2position.x,
        this.config.player2position.y,
        "playerFly",
        "assets/playerFly.png"
      )
      .setScale(4)
      .setFlipX(true);

    this.player2.setBodySize(
      this.player2.width * 0.26,
      this.player2.height * 0.7
    );

    this.player2.setTint(0x001aff);
    // this.player2.body.setAllowGravity(false);
  }

  createP1Hitbox() {
    this.hitbox = this.physics.add
      .image(
        this.config.player1position.x - 200,
        this.config.player1position.y,
        "hitbox"
      )
      .setScale(8)
      .setVisible(false);

    this.hitbox.body.setAllowGravity(false);
  }
  createP2Hitbox() {
    this.hitbox2 = this.physics.add
      .image(
        this.config.player2position.x + 200,
        this.config.player2position.y,
        "hitbox2"
      )
      .setScale(8)
      .setVisible(false);

    this.hitbox2.body.setAllowGravity(false);
  }

  createP1HitboxOnP2() {
    this.physics.add.collider(
      this.hitbox,
      this.player2,
      this.createWinnerP1,
      null,
      this
    );
  }
  createP2HitboxOnP1() {
    this.physics.add.collider(
      this.hitbox2,
      this.player,
      this.createWinnerP2,
      null,
      this
    );
  }

  createWinnerP1() {
    this.player2.setTint(0x000000);
    this.hitbox2.setTint(0x000000);
    this.star.setTint(0xff0000);
    this.star.setVisible(true);

    this.time.addEvent({
      delay: 1,
      callback: () => {
        this.playMusic.stop();
      },
      loop: false,
    });

    this.time.addEvent({
      delay: 100,
      callback: () => {
        this.physics.pause();
      },
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false,
    });
  }
  createWinnerP2() {
    this.player.setTint(0x000000);
    this.hitbox.setTint(0x000000);
    this.star.setTint(0x001aff);
    this.star.setVisible(true);

    this.time.addEvent({
      delay: 10,
      callback: () => {
        this.playMusic.stop();
      },
      loop: false,
    });

    this.time.addEvent({
      delay: 100,
      callback: () => {
        this.physics.pause();
      },
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false,
    });
  }

  handleP1Inputs() {
    this.input.keyboard.on("keydown-A", this.P1flapL, this);
    this.input.keyboard.on("keydown-D", this.P1flapR, this);
    this.input.keyboard.on("keydown-S", this.P1attack, this);
  }

  handleP2Inputs() {
    this.input.keyboard.on("keydown-J", this.P2flapL, this);
    this.input.keyboard.on("keydown-L", this.P2flapR, this);
    this.input.keyboard.on("keydown-K", this.P2attack, this);
  }

  playerOutiseChecker() {
    if (
      this.player.getBounds().bottom >= this.config.height ||
      this.player.y <= 15 ||
      this.player.x >= this.config.width - 25 ||
      this.player.x <= 15
    ) {
      this.player.setTint(0x000000);

      this.createWinnerP2();
    } else if (
      this.player2.getBounds().bottom >= this.config.height ||
      this.player2.y <= 15 ||
      this.player2.x >= this.config.width - 25 ||
      this.player2.x <= 15
    ) {
      this.player2.setTint(0x000000);
      this.createWinnerP1();
    }
  }
  //PLayer 1
  P1flapL() {
    this.player.body.velocity.y = this.velocityY;
    this.player.body.velocity.x = -150;

    this.player.setFlipX(true);
    this.player.play("fly");
    this.birdFlapSE();
  }

  P1flapR() {
    this.player.body.velocity.y = this.velocityY;
    this.player.body.velocity.x = 150;

    this.player.setFlipX(false);
    this.player.play("fly");
    this.birdFlapSE();
  }
  P1attack() {
    this.blockPlacedSE();
    this.player.setFlipX(true);
    this.hitbox.setPosition(this.player.x - 80, this.player.y).setVisible(true);

    this.player.play("attack");

    this.player.on("animationcomplete", () => {
      this.player.play("chill");

      this.player.setFlipX(false);
    });
  }
  //Player 2
  P2flapL() {
    this.player2.body.velocity.y = this.velocityY;
    this.player2.body.velocity.x = -150;

    this.player2.setFlipX(true);
    this.player2.play("fly");
    this.birdFlapSE();
  }

  P2flapR() {
    this.player2.body.velocity.y = this.velocityY;
    this.player2.body.velocity.x = 150;

    this.player2.setFlipX(false);
    this.player2.play("fly");
    this.birdFlapSE();
  }
  P2attack() {
    this.blockPlacedSE();
    this.player2.setFlipX(false);
    this.hitbox2
      .setPosition(this.player2.x + 80, this.player2.y)
      .setVisible(true);

    this.player2.play("attack");

    this.player2.on("animationcomplete", () => {
      this.player2.play("chill");
      this.player2.setFlipX(true);
    });
  }
}

export default PlayScene;
