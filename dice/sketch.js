var dice1 = 0;
var dice2 = 0;
var total = 0;
var num_dice = 2;
var dice_faces = [0, 1, 2, 3];
var inProgress = false;
var spinner;

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
	total = getTotal(dice1, dice2);
}

function showTotal() {
	textSize(100);
	fill(255, 0, 255);
	text(dice1, width/3, height/3);
	text(dice2, width*2/3, height/3);

	textSize(150);
	fill(0, 255, 0);
	text(total, width/2, height*2/3);
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
	background(50, 50, 50);	

	if (inProgress) {
		image(spinner, width/2, height/2);
	}	else {
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