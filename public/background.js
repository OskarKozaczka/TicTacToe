let app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
document.getElementById('Background').append(app.view);
const container = new PIXI.Container();
app.stage.addChild(container);

app.renderer.backgroundColor = 0x212020;

const SpriteList = [];

const totalX = 20;

for (let i = 0; i < totalX; i++) {
	var Sprite;
	if (Math.random() < 0.5) Sprite = PIXI.Sprite.from('../assets/X.png');
	else Sprite = PIXI.Sprite.from('../assets/O.png');
	Sprite.anchor.set(0.5);
	Sprite.scale.set(0.8 + Math.random() * 0.3);
	Sprite.x = Math.random() * app.screen.width;
	Sprite.y = Math.random() * app.screen.height;
	Sprite.direction = Math.random() * Math.PI * 2;
	Sprite.turningSpeed = Math.random() - 0.8;
	Sprite.speed = 2 + Math.random() * 2;
	SpriteList.push(Sprite);
	app.stage.addChild(Sprite);
}

const BoundsPadding = 100;
const Bounds = new PIXI.Rectangle(-BoundsPadding, -BoundsPadding, app.screen.width + BoundsPadding * 2, app.screen.height + BoundsPadding * 2);

app.ticker.add(() => {
	for (let i = 0; i < SpriteList.length; i++) {
		const Sprite = SpriteList[i];
		Sprite.direction += Sprite.turningSpeed * 0.01;
		Sprite.x += Math.sin(Sprite.direction) * Sprite.speed;
		Sprite.y += Math.cos(Sprite.direction) * Sprite.speed;
		Sprite.rotation = -Sprite.direction - Math.PI / 2;

		if (Sprite.Sprite < Bounds.Sprite) {
			Sprite.Sprite += Bounds.width;
		} else if (Sprite.Sprite > Bounds.Sprite + Bounds.width) {
			Sprite.Sprite -= Bounds.width;
		}

		if (Sprite.y < Bounds.y) {
			Sprite.y += Bounds.height;
		} else if (Sprite.y > Bounds.y + Bounds.height) {
			Sprite.y -= Bounds.height;
		}
	}
});
