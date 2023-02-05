
import { Application, Container, Graphics, Rectangle, Text } from "pixi.js";
import CardsScene from "./Scenes/CardsScene";
import TextScene from "./Scenes/TextScene";
import ParticlesScene from "./Scenes/ParticlesScene";
import MenuScene from "./Scenes/MenuScene";

function init({ stage, screen, ticker }: Application) {
  const root = new Container();
  stage.addChild(root);

  MenuScene(screen, root);
}

export default function main(app: Application) {
  init(app);
}
