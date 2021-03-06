var snake;
var food;
var specialFood;
var foodCount;
var specialFoodStartFrame;
var small_bite_sound;
var big_bite_sound;
var game_over_sound;
var clock_sound;

function setup () {
	loadSounds();
	createCanvas(w, h);
	frameRate(defaultFrameRate);

	startGame();
}

function loadSounds () {
	small_bite_sound = loadSound('sounds/small_bite.wav');
	big_bite_sound = loadSound('sounds/big_bite.wav');
	game_over_sound = loadSound('sounds/game_over.wav');
	clock_sound = loadSound('sounds/heart_beat.wav');
};

function startGame () {
	snake = new Snake(width / 2, height / 2);

	//Food related
	foodCount = 0;
	food = {
		eaten: true,
		pos: createVector,
		clr: null,
		size: foodSize
	};
	specialFood = {
		pos: createVector,
		clr: null,
		size: foodSize,
		eaten: true
	};

	document.getElementById("score").innerHTML = "Score\t0";
}

function createFoodAtRandom () {
	food.clr = color(foodColor.R, foodColor.G, foodColor.B);
	food.pos = createVector(floor(random(width / food.size)) * food.size, floor(random(height / food.size)) * food.size);
	food.eaten = false;

	if (specialFood.eaten) {
		foodCount++;
	}
	specialFood.show = true;
}

function createSpecialFoodAtRandom () {
	specialFood.clr = color(specialFoodColor.R, specialFoodColor.G, specialFoodColor.B);
	specialFood.pos = createVector(floor(random(width / specialFood.size)) * specialFood.size, floor(random(height / specialFood.size)) * specialFood.size);
	specialFood.eaten = false;
	specialFood.show = false;
	clock_sound.play();
}

function keyPressed() {
	if (keyCode === RIGHT_ARROW) {
		snake.moveRight();
	} else if (keyCode === LEFT_ARROW) {
		snake.moveLeft();
	} else if (keyCode === UP_ARROW) {
		snake.moveUp();
	} else if (keyCode === DOWN_ARROW) {
		snake.moveDown();
	} else {
		console.log("Invalid key pressed");
	}
}

function showFood () {
	push();
	fill(food.clr);
	ellipse(food.pos.x, food.pos.y, food.size, food.size);
	pop();
}

function showSpecialFood () {
	push();
	fill(specialFood.clr);

	var sz = specialFood.size;
	sz *= map(frameCount % defaultFrameRate, 0, defaultFrameRate, 0.5, 1.5);

	ellipse(specialFood.pos.x, specialFood.pos.y, sz, sz);
	pop();
}

function draw () {
	//If snake is dead
	if (snake.dead) {
		game_over_sound.play();

		startGame();
	}

	//Background
	background(50);

	//Align the grid properly
	translate(snakeSize / 2, snakeSize / 2);

	//Check if snake eats the food
	if (snake.pos.x === food.pos.x && snake.pos.y === food.pos.y) {
		food.eaten = true;
		snake.eatFood();
		small_bite_sound.play();
	}

	//Create new food if food gets eaten
	if (food.eaten) {
		createFoodAtRandom();
	}

	//Show the food
	showFood();

	if (specialFood.show && specialFood.eaten && !(foodCount % specialFoodInterval)) {
		createSpecialFoodAtRandom();
		specialFoodStartFrame = frameCount;
	}

	if (!specialFood.eaten) {
		showSpecialFood();
		if (frameCount - specialFoodStartFrame === defaultFrameRate * specialFoodLifeSpan) {
			specialFood.eaten = true;
			specialFood.show = false;
			if (clock_sound.isPlaying()) {
				clock_sound.stop();
			}
		}

		//Check if snake eats the food
		if (snake.pos.x === specialFood.pos.x && snake.pos.y === specialFood.pos.y) {
			specialFood.eaten = true;
			specialFood.show = false;
			snake.eatFood(true);
			if (clock_sound.isPlaying()) {
				clock_sound.stop();
			}
			big_bite_sound.play();
		}
	}

	//Update and show the snake
	snake.update();
	snake.show();
}