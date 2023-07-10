const gui = new dat.GUI();

let cursor = document.getElementById("cursor");

var options = {
	windows: 4,
	offset: 11,
	width: 3,
	height: 2,
	trim: 3.5,
	floorHeight: 4,
	reset: reset,
	windowColor: "#486f75",
	trimColor: "#b6b5b5",
}

function reset() {
	options.windows = 4;
	options.offset = 11;
	options.width = 3;
	options.height = 2;
	options.trim = 3.5;
	options.floorHeight = 4;
	options.reset = reset;
	options.windowColor = "#486f75";
	options.trimColor = "#b6b5b5";
}

let canvas = document.getElementById("canvas");
let ctx;
let img;
let plant;

window.onload = function() {
  ctx = canvas.getContext("2d");

  img = document.getElementById("shop");
  plant = document.getElementById("plants");

	gui.add(options, "windows", 0, 10, 1);
	// gui.add(options, "height");
	gui.add(options, "offset", 0, 20, 0.5);
	gui.add(options, "width", 0, 6, 0.5);
	gui.add(options, "height", 0, 7, 0.5)
	gui.add(options, "trim", 0, 5, 0.5).name("trim (in)")
	gui.add(options, "floorHeight", 0, 7, 0.25);
	gui.add(options, 'reset');
	gui.addColor(options, 'windowColor');
	gui.addColor(options, 'trimColor');

	requestAnimationFrame(update);
};

function update() {
	console.log('update')
	ctx.clearRect(0, 0, 1000, 750)
	ctx.drawImage(img, 0, 0);

	let availableSpace = 50 - (options.offset * 2);
	let centerSep = availableSpace / (options.windows + 1);

	ctx.strokeStyle = "green";
	ctx.lineWidth = 0.5;

	// draw start offset
	ctx.beginPath();
	ctx.moveTo(STARTX + feetToPixels(options.offset), STARTY);
	ctx.lineTo(STARTX + feetToPixels(options.offset), STARTY + HEIGHT);
	ctx.stroke();

	// draw end offset
	ctx.beginPath();
	ctx.moveTo(STARTX + feetToPixels(50 - options.offset), STARTY);
	ctx.lineTo(STARTX + feetToPixels(50 - options.offset), STARTY + HEIGHT);
	ctx.stroke();

	// ACTUAL WALLS
	ctx.strokeStyle = "darkred";
	ctx.lineWidth = feetToPixels((1/12) * 2);

	// draw end offset
	ctx.beginPath();
	ctx.moveTo(STARTX + feetToPixels(50 - 11), STARTY);
	ctx.lineTo(STARTX + feetToPixels(50 - 11), STARTY + HEIGHT);
	ctx.stroke();

	// ctx.

	for (var i=1;i<=options.windows;i++) {
		let rX = STARTX + feetToPixels(options.offset + (centerSep * i) - (options.width / 2));
		let rY = STARTY + HEIGHT - feetToPixels(options.floorHeight + options.height);
		let trimPix = feetToPixels((1/12) * options.trim)

		ctx.fillStyle = options.windowColor;
		ctx.strokeStyle = options.trimColor;
		ctx.lineWidth = trimPix;

		ctx.fillRect(rX, rY, feetToPixels(options.width), feetToPixels(options.height));

		ctx.beginPath();
		ctx.rect(rX - (trimPix/2), rY - (trimPix/2), feetToPixels(options.width) + trimPix, feetToPixels(options.height) + trimPix);
		ctx.stroke()
	}

	ctx.drawImage(plant, 0, 0)

	requestAnimationFrame(update);
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
	cursor.innerHTML = "x: " + x + " y: " + y;
}


//  56, 328
// 932, 454
// w: 876, h: 126
//
const STARTX = 56;
const STARTY = 328;
const HEIGHT = 126;

function feetToPixels(feet) {
	return (876/50) * feet;
}

canvas.addEventListener('mousemove', function(e) {
    getCursorPosition(canvas, e)
})
