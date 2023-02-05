import { Container, Graphics, ParticleContainer, Rectangle, Sprite, Text, Texture} from "pixi.js";
import * as particles from 'pixi-particles'
import MenuScene from "./MenuScene";
import fire from '../assets/particles-scene/fire.png';

let scene = new Container();

const texture = Texture.from(fire);

var emitter : particles.Emitter;
var elapsed = Date.now();

var update = function(){
	requestAnimationFrame(update);

	var now = Date.now();

	emitter.update((now - elapsed) * 0.001);
	elapsed = now;
};

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
    scene.destroy();
}

export default function ParticlesScene(screen : Rectangle, rootScene : Container) {
    scene = new Container();
    
    const background = new Graphics();
    background.beginFill(0x000000);
    background.drawRect(0, 0, screen.width, screen.height);
    background.endFill();
    scene.addChild(background);

	emitter = new particles.Emitter(
		scene,
		[texture],
		{
			alpha: {
				list: [
					{
						value: 0.8,
						time: 0
					},
					{
						value: 0.1,
						time: 1
					}
				],
				isStepped: false
			},
			scale: {
				list: [
					{
						value: 0.5,
						time: 0
					},
					{
						value: 2.5,
						time: 1
					}
				],
				isStepped: true
			},
			color: {
				list: [
					{
						value: "fb1010",
						time: 0
					},
					{
						value: "f5b830",
						time: 1
					}
				],
				isStepped: false
			},
			speed: {
				list: [
					{
						value: 50,
						time: 0
					},
					{
						value: 10,
						time: 1
					}
				],
				isStepped: false
			},
			startRotation: {
				min: 240,
				max: 300
			},
			rotationSpeed: {
				min: -10,
				max: 10
			},
			lifetime: {
				min: 0.2,
				max: 1.5
			},
			frequency: 0.02,
			spawnChance: 1,
			particlesPerWave: 1,
			emitterLifetime: 10000,
			maxParticles: 10,
			pos: {
				x: screen.width/2,
				y: screen.height/2
			},
			addAtBack: false,
			spawnType: "circle",
			spawnCircle: {
				x: 0,
				y: 0,
				r: 1
			}
		}
	);

    emitter.emit = true;
    update();

    CreateCloseButton(screen, rootScene);
    rootScene.addChild(scene);
}