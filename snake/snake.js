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
	this.tailWithFood = 0;
	this.alreadyMoved = false;

	this.update = function () {
		if (!(frameCount % (defaultFrameRate / (this.velx + this.vely)))) {
			this.updateTail();
			this.updateHead();
			this.checkIfDead();
			this.alreadyMoved = false;
		}
	};

	this.updateTail = function () {
		//Update Tail positions
		for (var i = this.tail.length - 1; i >= 0; i--) {
			var tailPart = this.tail[i];
			if (i === 0) {
				tailPart.pos = this.pos.copy();
			} else {
				tailPart.pos = this.tail[i - 1].pos.copy();
			}

			if (this.tailWithFood === i) {
				tailPart.clr = tailColorWithFood;
			} else {
				tailPart.clr = snakeColor;
			}
		}

		if (this.tailWithFood < this.tail.length) {
			this.tailWithFood++;
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
		if (!this.velx && !this.alreadyMoved) {
			this.velx = defaultVel;
			this.vely = 0;
			this.flip = 1;
			this.alreadyMoved = true;
		}
	};

	this.moveLeft = function () {
		if (!this.velx && !this.alreadyMoved) {
			this.velx = defaultVel;
			this.vely = 0;
			this.flip = -1;
			this.alreadyMoved = true;
		}
	};

	this.moveUp = function () {
		if (!this.vely && !this.alreadyMoved) {
			this.velx = 0;
			this.vely = defaultVel;
			this.flip = -1;
			this.alreadyMoved = true;
		}
	};

	this.moveDown = function () {
		if (!this.vely && !this.alreadyMoved) {
			this.velx = 0;
			this.vely = defaultVel;
			this.flip = 1;
			this.alreadyMoved = true;
		}
	};

	this.eatFood = function (isSpecialFood) {
		this.tail.push({
			pos: this.lastPos.copy(),
			clr: this.clr
		});

		this.tailWithFood = 0;
		this.score += isSpecialFood ? 5 : 1;
		document.getElementById("score").innerHTML = "Score\t" + this.score;

	};

	this.show = function () {
		push();
		noStroke();

		//Show Head
		fill(tailHeadColor.R, tailHeadColor.G, tailHeadColor.B);
		ellipse(this.pos.x, this.pos.y, this.r * 1.2, this.r * 1.2);

		//Show Tail
		for (var i = 0; i < this.tail.length; i++) {
			var tailPart = this.tail[i];
			var size = this.r;
			if (i === this.tail.length - 1) {
				fill(tailEndColor.R, tailEndColor.G, tailEndColor.B);
				size /= 1.2;
			} else {
				fill(tailPart.clr.R, tailPart.clr.G, tailPart.clr.B);
			}
			ellipse(tailPart.pos.x, tailPart.pos.y, size, size);
		}

		pop();
	};
}