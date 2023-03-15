import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";
import MenuScene from "./scenes/MenuScene";
import PreloadScene from "./scenes/PreloadScene";
import TutorialScene from "./scenes/TutorialScene";
import CreditsScene from "./scenes/CreditsScene";

const WIDTH = 1000;
const HEIGHT = 600;
const PLAYER1POSITION = { x: WIDTH / 10, y: HEIGHT / 1.5 };
const PLAYER2POSITION = { x: WIDTH - 100, y: HEIGHT / 1.5 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  player1position: PLAYER1POSITION,
  player2position: PLAYER2POSITION,
};

const Scenes = [
  PreloadScene,
  MenuScene,
  PlayScene,
  TutorialScene,
  CreditsScene,
];

const createScene = (Scene) => new Scene(SHARED_CONFIG);

const initScenes = () => Scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 600,
        x: 0,
      },
      debug: false,
    },
  },
  scene: initScenes(),
};

new Phaser.Game(config);
