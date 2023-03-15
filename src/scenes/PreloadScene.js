import Phaser from "phaser";
// import MenuScene from "./MenuScene";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }
  preload() {
    this.load.image("bg", "assets/bg.png");
    this.load.image("star", "assets/star.png");
    this.load.image("hitbox", "assets/hitbox.png");
    this.load.image("hitbox2", "assets/hitbox2.png");
    this.load.image("back", "assets/back.png");
    this.load.image("tutorial", "assets/tutorialIMG.png");
    this.load.image("credits", "assets/creditsIMG.png");
    //Music
    this.load.audio("menuMusic", "assets/music/menu.mp3");
    this.load.audio("playMusic", "assets/music/play.mp3");
    // Sound Effects
    this.load.audio("birdFlap", "assets/soundEffects/birdFlap.mp3");
    this.load.audio("blockHit", "assets/soundEffects/blockHit.mp3");
    this.load.audio("blockPlaced", "assets/soundEffects/blockPlaced.mp3");
    this.load.audio("click", "assets/soundEffects/click.mp3");

    //Animations
    //Fly
    this.load.spritesheet("playerFly", "assets/playerFly.png", {
      frameHeight: 24,
      frameWidth: 58,
    });

    //Attack
    this.load.spritesheet("playerAttack", "assets/playerAttack.png", {
      frameHeight: 24,
      frameWidth: 58,
    });
  }
  create() {
    this.scene.start("MenuScene");
  }
}

export default PreloadScene;
