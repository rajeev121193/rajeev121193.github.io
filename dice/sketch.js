var dice1 = 0;
var dice2 = 0;
var total = 0;
var num_dice = 2;
var dice_faces = [0, 1, 2, 3];
var inProgress = false;
var spinner;
var lastTotal = 0;

function preload() {
	spinner = loadImage('assets/spinner.svg');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	imageMode(CENTER);
}

function rollDice() {
	dice1 = findRandomDiceValue();
	dice2 = findRandomDiceValue();
	calculateNewTotal(dice1, dice2);
}

function showTotal() {
	textSize(width/6);
	fill(255, 0, 255);
	text(dice1, width/3, height/3);
	text(dice2, width*2/3, height/3);

	textSize(width/5);
	fill(0, 255, 0);
	text(total, width/2, height*2/3);
}

function showLastTotal() {
	textSize(width/10);
	fill(0, 255, 255);
	text(lastTotal, width/10, height/10);
}

function calculateNewTotal(dice1, dice2) {
	lastTotal = total;
	total = dice1 + dice2 === 0 ? 12 : dice1 + dice2;
}

function findRandomDiceValue() {
	return random(dice_faces);
}

function draw() {
	colorMode(RGB, 255);
	background(50, 50, 50);	

	if (inProgress) {
		image(spinner, width/2, height/2);
	}	else {
		showLastTotal();
		showTotal();
	}
}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
document.ontouchmove = function(event) {
    event.preventDefault();
};

function touchStarted() {
	inProgress = true;
}

function touchEnded() {
	rollDice();
	inProgress = false;
}