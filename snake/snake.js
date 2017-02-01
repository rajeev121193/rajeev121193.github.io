function Snake(x, y, clr) {
	this.pos = createVector(x, y);
	this.velx = defaultVel;
	this.vely = 0;
	this.r = snakeSize;
	this.flip = 1;
	this.clr = color(snakeColor.R, snakeColor.G, snakeColor.B);
	this.dead = false;
	this.score = 0;

	//Tail related
	this.tail = [];
	this.lastPos = this.pos;

	this.update = function () {
		if (!(frameCount % (defaultFrameRate / (this.velx + this.vely)))) {
			this.updateTail();
			this.updateHead();
			this.checkIfDead();
		}
	};

	this.updateTail = function () {
		//Update Tail positions
		for (var i = this.tail.length - 1; i >= 0; i--) {
			if (i === 0) {
				this.tail[i].pos = this.pos.copy();
			} else {
				this.tail[i].pos = this.tail[i - 1].pos.copy();
			}
		}
	};

	this.updateHead = function () {
		//Update Head position
		if (this.velx) {
			this.pos.add(createVector(this.flip * this.r, 0));
			if (this.pos.x < 0) {
				this.pos.x += width;
			}
			this.pos.x = this.pos.x % width;
		} else {
			this.pos.add(createVector(0, this.flip * this.r));
			if (this.pos.y < 0) {
				this.pos.y += height;
			}
			this.pos.y = this.pos.y % height;
		}
	};

	this.checkIfDead = function () {
		this.dead = this.tail.some(function (tailPiece) {
			return (tailPiece.pos.x === this.pos.x && tailPiece.pos.y === this.pos.y);
		}.bind(this));
	};

	this.reset = function () {
		this.tail = [];
		this.score = 0;
	};

	this.moveRight = function () {
		if (!this.velx) {
			this.velx = defaultVel;
			this.vely = 0;
			this.flip = 1;
		}
	};

	this.moveLeft = function () {
		if (!this.velx) {
			this.velx = defaultVel;
			this.vely = 0;
			this.flip = -1;
		}
	};

	this.moveUp = function () {
		if (!this.vely) {
			this.velx = 0;
			this.vely = defaultVel;
			this.flip = -1;
		}
	};

	this.moveDown = function () {
		if (!this.vely) {
			this.velx = 0;
			this.vely = defaultVel;
			this.flip = 1;
		}
	};

	this.eatFood = function (isSpecialFood) {
		this.tail.push({
			pos: this.lastPos.copy()
		});

		this.score += isSpecialFood ? 5 : 1;
		document.getElementById("score").innerHTML = "Score\t" + this.score;

	};

	this.show = function () {
		push();
		noStroke();
		fill(this.clr);

		//Show Head
		ellipse(this.pos.x, this.pos.y, this.r, this.r);

		//Show Tail
		for (var i = this.tail.length - 1; i >= 0; i--) {
			ellipse(this.tail[i].pos.x, this.tail[i].pos.y, this.r, this.r);
		}
		pop();
	};
}