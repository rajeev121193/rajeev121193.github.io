var dice1 = 0;
var dice2 = 0;
var total = 0;
var num_dice = 2;
var dice_faces = [0, 1, 2, 3];
var button;
var w = 800;
var h = 600;

function setup() {
	createCanvas(w, h);

	captureButton = createButton('Roll Dice');
    captureButton.position(w/2, h*3/4);
    captureButton.mousePressed(rollDice);
}

function rollDice() {
	dice1 = findRandomDiceValue();
	dice2 = findRandomDiceValue();
	total = getTotal(dice1, dice2);
}

function showTotal() {
	textSize(100);
	fill(255, 0, 255);
	text(dice1, w/3, h/3);
	text(dice2, w*2/3, h/3);

	textSize(150);
	fill(0, 255, 0);
	text(total, w/2, h*2/3);
}

function getTotal(dice1, dice2) {
	var total = dice1 + dice2;
	if (total === 0) {
		return 12;
	} else {
		return total;
	}
}

function findRandomDiceValue() {
	return random(dice_faces);
}

function draw() {
	colorMode(RGB, 255);
	background(0);	

	showTotal();
}