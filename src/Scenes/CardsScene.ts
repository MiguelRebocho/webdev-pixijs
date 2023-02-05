import { Sprite, Container, Graphics, Texture, Ticker, Text, BaseTexture, Rectangle } from "pixi.js";
import MenuScene from "./MenuScene";
import card from '../assets/cards-scene/card.svg';

const deckSize = 144;
const deckXOffset = 10;

const texture = new Texture(new BaseTexture(card));

let scene = new Container();
let deck : Array<Sprite> = new Array<Sprite>();
let timeouts : Array<NodeJS.Timeout> = new Array<NodeJS.Timeout>();


function InitDeck() {

    for (let i = 0; i < 144; i++) {
        const sprite = Sprite.from(texture);
        sprite.anchor.set(0, 0.5);

        //TODO: PRELOAD ASSETS
        sprite.width = 300;
        sprite.height = 450;
        
        sprite.x = scene.width/2 - sprite.width - deckXOffset;
        sprite.y = sprite.height/2 + ((deckSize - i) * 2);

        scene.addChild(sprite);
        deck.push(sprite);
    }
}

function moveCard(deltaTime : number, cardIndex : number) {
    let sprite = deck[deck.length - cardIndex];

    const xMovement = (sprite.width/2 + deckXOffset)/(Ticker.shared.FPS/deltaTime);
    const yMovement = (deckSize - (cardIndex * 2))/(Ticker.shared.FPS/deltaTime);

    sprite.x += xMovement * deltaTime;
    sprite.y += yMovement * deltaTime;
}

function AjustCardFinalPos(cardIndex : number) {
    let sprite = deck[deck.length - cardIndex];
    sprite.x = (scene.width/2 + deckXOffset);
    sprite.y = sprite.height/2 + ((deckSize - cardIndex) * 2);
}

function StackCards() {
    for (let i = 0; i < 144; i++) {
        var timeoutId = setTimeout(() => {
            const card_ticker = new Ticker();
            card_ticker.add(() => moveCard(card_ticker.deltaTime, i + 1));
            card_ticker.start();

            var timeout = setTimeout(() => {
                card_ticker.destroy()
                scene.setChildIndex(deck[deck.length - (i + 1)], i + 1)
                AjustCardFinalPos(i + 1)
            }, 2000);

            timeouts.push(timeout);
        }, 1000 * i);

        timeouts.push(timeoutId);
    }
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
        Destroy();
        MenuScene(screen, rootScene);
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
    timeouts.forEach((id) => {
        clearTimeout(id);
    });

    deck.forEach((card) => {
        card.destroy();
    })
}

export default function CardsScene(screen : Rectangle, rootScene : Container) {
    // var assetsToLoad = [ './assets/card.svg'];
    // var loader = new PIXI.AssetLoader(assetsToLoad);
    // loader.onComplete = init();
    // loader.load();
    scene = new Container();
    deck = new Array<Sprite>();

    const background = new Graphics();
    background.beginFill(0x00512c);
    background.drawRect(0, 0, screen.width, screen.height);
    background.endFill();
    scene.addChild(background);

    CreateCloseButton(screen, rootScene);
    InitDeck();
    StackCards();

    return scene;
}