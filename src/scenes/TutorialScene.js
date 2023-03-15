import BaseScene from "./BaseScene";

class TutorialScene extends BaseScene {
  constructor(config) {
    super("TutorialScene", { ...config, canGoBack: true });
  }
  create() {
    super.create();

    this.add.image(500, 300, "tutorial").setOrigin();
  }
}

export default TutorialScene;
