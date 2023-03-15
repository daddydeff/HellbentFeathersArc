import Phaser from "phaser";

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key, config);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0);
    this.click = this.sound.add("click", { loop: false });

    if (this.config.canGoBack) {
      const backBtn = this.add
        .image(25, 25, "back")
        .setOrigin()
        .setScale(2)
        .setInteractive();

      backBtn.on("pointerup", () => {
        this.click.play();

        this.scene.start("MenuScene");
        this.playMusic.stop();
      });
    }
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;

    menu.forEach((menuItem) => {
      const menuPosition = [
        this.screenCenter[0],
        this.screenCenter[1] + lastMenuPositionY,
      ];

      menuItem.textGO = this.add
        .text(...menuPosition, menuItem.text, {
          fontSize: "100px",
          fill: "#000000",
        })
        .setOrigin(0.5, 2);
      lastMenuPositionY += 150;
      setupMenuEvents(menuItem);
    });
  }
}

export default BaseScene;
