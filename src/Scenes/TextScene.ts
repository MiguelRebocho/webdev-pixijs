import { Container, Graphics, Spritesheet, BaseTexture, Rectangle, Sprite, Text } from "pixi.js";
import MenuScene from "./MenuScene";
import emojis from '../assets/text-scene/emojis.png';

const atlasData = {
	frames: {
		smiler: {
			frame: { x: 0, y:0, w:128, h:128 },
		},
		trickier: {
			frame: { x: 128, y:0, w:128, h:128 },
		},
        lover: {
			frame: { x: 256, y:0, w:128, h:128 },
		},
		cool: {
			frame: { x: 384, y:0, w:128, h:128 },
		}
	},
	meta: {
		image: emojis,
		format: 'RGBA8888',
		size: { w: 512, h: 512 },
		scale: 1
	}
}
const iconKeys = [ 'smiler', 'trickier', 'lover', 'cool']
const fontKeys = [ 'Arial', 'Courier New', 'Helvetica', 'Times New Roman', 'Comic Sans MS']
const maxMessageSegments = 5;
const maxTextSize = 20;

let spritesheet = new Spritesheet(
    BaseTexture.from(atlasData.meta.image),
    atlasData
);

let scene = new Container();
let currentMessage = new Container();
let messageRandomizer : NodeJS.Timeout;

function Init() {
    scene.addChild(currentMessage);
    InitRandomMessage();
    messageRandomizer = setInterval(InitRandomMessage, 2000);
}

function InitRandomMessage() {
    scene.removeChild(currentMessage);

    currentMessage = new Container();
    
    let segmentsNumber = Math.round(Math.random() * maxMessageSegments);
    segmentsNumber = Math.max(1, segmentsNumber);
    
    for (let i = 0; i < segmentsNumber + 1; i++) {
        let isText = Math.round(Math.random());
        if (isText == 1) {
            let textSize = Math.round(Math.random() * maxTextSize);
            addRandomText(textSize);
        } else {
            addRandomEmoji();
        }
    }
    
    currentMessage.x = scene.width/2 - currentMessage.width/2;
    currentMessage.y = scene.height/2 - currentMessage.height/2;

    scene.addChild(currentMessage);
    
}

function addRandomText(length : number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    let fontId = Math.floor(Math.random() * fontKeys.length);

    let text = new Text(result, {
        fontFamily: fontKeys[fontId],
        fontSize: 34,
        fill: 0xffffff,
    });
    text.x = currentMessage.width;

    currentMessage.addChild(text);
}

function addRandomEmoji() {
    var emojiIndex = Math.floor(Math.random() * iconKeys.length);
    console.log(emojiIndex);
    const sprite = Sprite.from(spritesheet.textures[iconKeys[emojiIndex]]);

    sprite.width = 50;
    sprite.height = 50;
    sprite.x = currentMessage.width;

    currentMessage.addChild(sprite);
}

function CreateCloseButton(screen : Rectangle, rootScene : Container) {
    const button = new Graphics();
    const cardsButton = new Graphics();

    button.x = rootScene.width - 125;
    button.y = 50;

    cardsButton.interactive = true;
    cardsButton.beginFill(0xe7e7e7);
    cardsButton.drawRect(0, 0, 75, 75);
    cardsButton.endFill();
    cardsButton.on("click", () => {
        rootScene.removeChild(scene);
        MenuScene(screen, rootScene);
        Destroy();
        scene.destroy();
    });
    button.addChild(cardsButton);
    
    let text = new Text("Back", {
        fontFamily: 'Arial',
        fontSize: 28,
        fill: 0x000000,
    });
    text.x = button.width/2 - text.width/2;
    text.y = button.height/2 - text.height/2;
    button.addChild(text);

    
    scene.addChild(button);
}

function Destroy() {
    currentMessage.destroy();
    scene.destroy();
    clearInterval(messageRandomizer);
}

export default function TextScene(screen : Rectangle, rootScene : Container) {
    scene = new Container();
    currentMessage = new Container();
    
    const background = new Graphics();
    background.beginFill(0x000000);
    background.drawRect(0, 0, screen.width, screen.height);
    background.endFill();
    scene.addChild(background);

    scene.width = scene.width;
    scene.height = scene.height;

    spritesheet.parse(() => {
        CreateCloseButton(screen, rootScene);
        Init();
    });

    return scene;
}