import BaseScene from "./BaseScene";

class CreditsScene extends BaseScene {
  constructor(config) {
    super("CreditsScene", { ...config, canGoBack: true });
  }
  create() {
    super.create();

    this.add.image(500, 300, "credits").setOrigin();
  }
}

export default CreditsScene;
