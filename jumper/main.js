var vyra;
var vyraRendered = false;
var obstacleList;

function setup() {
	createCanvas(w, h);
}

function draw() {
	background(220);

	fill(50);

	renderLevel();

	initVyra();
}

function renderLevel() {
	obstacleList = [];
	for (var i = 0; i < level.length; i++) {
		var y = i * blockSize;
		var row = level[i];
		for (var j = 0; j < row.length; j++) {
			var x = j * blockSize;
			var block = row[j];
			if (block === "O") {
				rect(x, y, blockSize, blockSize);
				obstacleList.push({
					x: x,
					y: y
				});
			} else if (block === "S") {
				ellipse(x + w/2, y + w/2, w, w);
			} else if (!vyraRendered && block === "H") {
				vyra = new Vyra(x, y);
				vyraRendered = true;
			}
		}
	}
}

function checkCollisions() {
	for(var i = 0; i < obstacleList.length; i++) {
		var x = obstacleList[i].x;
		var y = obstacleList[i].y;

		var vyraX = vyra.pos.x;
		var vyraY = vyra.pos.y;

		if (vyraX > x && vyraX < x + blockSize || x >= vyraX && x < vyraX + heroSize) {
			if (y > vyraY && y < vyraY + blockSize) {
				vyra.hitWall("bottom", x, y);
			} else if (vyraY > y && vyraY < y + blockSize) {
				vyra.hitWall("top", x, y);
			}
		}

		if (vyraY > y && vyraY < y + blockSize || y >= vyraY && y < vyraY + heroSize) {
			if (x > vyraX && x < vyraX + blockSize) {
				vyra.hitWall("right", x, y);
			} else if (vyraX > x && vyraX < x + blockSize) {
				vyra.hitWall("left", x, y);
			}
		}
	}
}

function initVyra() {
	vyra.update();

	vyra.show();

	checkCollisions();
}

function keyPressed() {
	if (keyCode === RIGHT_ARROW) {
		vyra.moveRight();
	} else if (keyCode === LEFT_ARROW) {
		vyra.moveLeft();
	} else if (keyCode === UP_ARROW) {
		vyra.jump();
	} else {
		console.log("Wrong key pressed");
	}
}

function keyReleased() {
	if (keyCode === RIGHT_ARROW) {
		vyra.stopAccelerating();
		console.log("Stopping right acceleration");
	} else if (keyCode === LEFT_ARROW) {
		vyra.stopAccelerating();
		console.log("Stopping left acceleration");
	}
}
