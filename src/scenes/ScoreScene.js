import BaseScene from "./BaseScene";

class ScoreScene extends BaseScene {
  constructor(config) {
    super("ScoreScene", { ...config, canGoBack: true });
  }

  create() {
    super.create();

    const highscoreText = localStorage.getItem("highScore");
    this.add
      .text(
        ...this.screenCenter,
        `High Score: ${highscoreText || 0}`,
        this.fontOptions
      )
      .setOrigin(0.5);
  }
}

export default ScoreScene;
