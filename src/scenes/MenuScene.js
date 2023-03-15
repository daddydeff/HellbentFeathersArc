import BaseScene from "./BaseScene";

class MenuScene extends BaseScene {
  constructor(config) {
    super("MenuScene", config);

    this.menu = [
      { scene: "PlayScene", text: "Play" },
      { scene: "TutorialScene", text: "Tutorial" },
      { scene: "CreditsScene", text: "Credits" },
    ];
  }

  create() {
    super.create();

    this.menuMusic = this.sound.add("menuMusic", { loop: false });
    this.click = this.sound.add("click", { loop: false });
    this.menuMusic.play();

    this.createMenu(this.menu, (menuItem) => this.setupMenuEvent(menuItem));
  }

  setupMenuEvent(menuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on("pointerover", () => {
      textGO.setStyle({ fontSize: "105px", fill: "#fffafa" });
    });
    textGO.on("pointerout", () => {
      textGO.setStyle({ fontSize: "100px", fill: "#000000" });
    });

    textGO.on("pointerup", () => {
      this.click.play();
      this.menuMusic.stop();

      menuItem.scene && this.scene.start(menuItem.scene);
    });
  }
}

export default MenuScene;
