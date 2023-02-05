import { Application, Container, Graphics, Rectangle, Text } from "pixi.js";
import CardsScene from "./CardsScene";
import TextScene from "./TextScene";
import ParticlesScene from "./ParticlesScene";

let buttonsList = new Array<Container>();
let scene = new Container();

function LoadScene(sceneName : string, screen :  Rectangle, root : Container) {
    let newScene = null;
    switch (sceneName) {
      case 'cardsScene':
        newScene = CardsScene(screen, root);
        break;
      case 'textScene':
        newScene = TextScene(screen, root);
        break;
      case 'particlesScene':
        newScene = ParticlesScene(screen, root);
        break;
      default:
        break;
    }
  
    if (newScene) {
        root.addChild(newScene);
        Destroy(root);
    }
  }

  function addButton(sceneName : string, sceneId : string, rootScene : Container, screen : Rectangle) {
    const button = new Graphics();
    const buttonBackground = new Graphics();
  
    button.x = screen.width/2 - 125;
    button.y = screen.height/2 - 110 * buttonsList.length
  
    buttonBackground.interactive = true;
    buttonBackground.beginFill(0xe7e7e7);
    buttonBackground.drawRect(0, 0, 250, 100);
    buttonBackground.endFill();
    buttonBackground.on("click", () => LoadScene(sceneId, screen, rootScene));
    
    button.addChild(buttonBackground);
  
    let text = new Text(sceneName, {
      fontFamily: 'Arial',
      fontSize: 34,
      fill: 0x000000,
    });
    text.x = button.width/2 - text.width/2;
    text.y = button.height/2 - text.height/2;
    button.addChild(text);
  
    buttonsList.push(button);
    scene.addChild(button);
  }

  function Destroy(rootScene : Container) {
    buttonsList.forEach(btn => scene.removeChild(btn));
    buttonsList = new Array<Container>();
    rootScene.removeChild(scene);
    scene.destroy();
  }

  export default function MenuScene(screen : Rectangle, rootScene : Container) {
    buttonsList = new Array<Container>();
    scene = new Container();

    const background = new Graphics();
    background.beginFill(0x555555);
    background.drawRect(0, 0, screen.width, screen.height);
    background.endFill();
    scene.addChild(background);
  
    let text = new Text("Welcome to the testing lab SOFTGAMES", {
      fontFamily: 'Arial',
      fontSize: 34,
      fill: 0x000000,
    });
    text.x = screen.width/2 - text.width/2;
    text.y = 200;
    scene.addChild(text);
  
    addButton("Particles", "particlesScene", rootScene, screen);
    addButton("Text", "textScene", rootScene, screen);
    addButton("Cards", "cardsScene", rootScene, screen);

    rootScene.addChild(scene);
  }