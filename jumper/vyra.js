function Vyra (x, y) {
	this.pos = createVector(x, y);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.maxAcc = maxAcc;
	this.stopForce = true;
	this.friction = 0.06;
	this.size = heroSize;
	this.dead = false;

	//Animation Related
	this.shouldSpin = true;
	this.clr = color(255, 0, 0);

	//Jumping Related
	this.isJumping  = false;
	this.jumpType;
	this.allowedJumps = {
		singleJump: true,
		doubleJump: true,
		wallJump: true
	};

	this.touchingWalls = {
		left: false, 
		right: false, 
		top: false, 
		bottom: false,
		isTouching: function() {
			return this.left || this.right || this.top || this.bottom;
		},
		untouch: function() {
			this.left = false;
			this.right = false;
			this.bottom = false;
			this.top = false;
		}
	};

	this.touchingWallPos = {
		left: createVector(), 
		right: createVector(), 
		top: createVector(), 
		bottom: createVector()
	};

	this.update = function () {
		//Do not update anything if dead
		if (this.dead) {
			return;
		}

		//Actual Movement
		this.vel.add(this.acc);
		this.pos.add(this.vel);

		//Reset gravity
		this.resetGravity();

		//Bound detection and collision detection
		this.keepInBounds();
		this.detectCollision();

		//Reset collision sensors
		this.touchingWalls.untouch();

		//Limit Acceleration
		this.limitAcceleration();
		
		//If dead
		if (this.dead) {
			this.die();
		}

		this.shouldSpin = this.vel.y < 0;
	};

	this.keepInBounds = function () {
		var stop = true;
		if (this.pos.x < 0) {
			this.pos.x = 0;
			console.log("Left border HIT!");
		} else if (this.pos.x > w - this.size) {
			this.pos.x = w - this.size;
			console.log("Right border HIT!");
		} else if (this.pos.y < 0) {
			this.pos.y = 0;
			console.log("Top border HIT!");
		} else if (this.pos.y > h - this.size) {
			this.pos.y = h - this.size;
			this.dead = true;
			console.log("Bottom border HIT!");
		} else {
			stop = false;
		}

		//Stop momentarily
		if (stop) {
			this.acc.mult(0);
			this.vel.mult(0);
		}
	};

	this.detectCollision = function () {
		if (this.vel.y < 0 && this.touchingWalls.top) { // detect top collision only is moving up
			this.pos.y = this.touchingWallPos.top.y + blockSize;
			this.acc.y = 0;
			this.vel.y = 0;
		}

		if (this.vel.x > 0 && this.touchingWalls.right) { // detect right collision only if moving right
			this.pos.x = this.touchingWallPos.right.x - this.size;
			this.acc.x = 0;
			this.vel.x = 0;
		}

		if (this.vel.x < 0 && this.touchingWalls.left) { // detect left collision only if moving left
			this.pos.x = this.touchingWallPos.left.x + blockSize;
			this.acc.x = 0;
			this.vel.x = 0;
		}

		if (this.touchingWalls.bottom) {
			this.pos.y = this.touchingWallPos.bottom.y - this.size;
			this.isJumping = false;

			if (this.stopForce) {
				this.applyFriction();
			}
		} else {
			this.applyGravity();
			this.isJumping = true;
			if (this.stopForce) {
				this.acc.x = 0;
			}
		}
	};

	this.limitAcceleration = function () {
		//Limit the horizontal acceleration
		if (this.acc.x > this.maxAcc) {
			this.acc.x = this.maxAcc;
		}
	};

	this.hitWall = function (str, posx, posy) {
		this.touchingWalls[str] = true;
		this.touchingWallPos[str] = createVector(posx, posy);
	};

	this.applyFriction = function () {
		var friction = this.friction;
		if (this.acc.x > friction * 2) {
			this.acc.add(createVector(-friction, 0));
			console.log("Resisting right motion");
		} else if (this.acc.x < friction * -2) {
			this.acc.add(createVector(friction, 0));
			console.log("Resisting left motion");
		} else {
			this.acc = createVector(0, this.acc.y);
			this.vel = createVector(0, this.vel.y);
		}
	};

	this.applyGravity = function() {
		this.acc.add(createVector(0, g));
	};

	this.resetGravity = function() {
		this.acc.y = 0;
	};

	this.die = function () {
		this.shouldSpin = false;
		this.isJumping = false;
		this.clr = color(255, 120, 0);
		console.log("DEAD!");
	};


	// Movements BEGIN ----------------------------------------------------
	this.moveRight = function () {
		if (!this.touchingWalls.right) {
			if (this.isJumping) {
				this.stopForce = true;
				if (this.vel.x === 0) {
					this.vel.x = vx;
				}
			} else {
				this.stopForce = false;
				this.acc.add(createVector(f, 0));
				console.log("Applying FORCE!");
			}
		}
	};

	this.moveLeft = function () {
		if (!this.touchingWalls.left) {
			if (this.isJumping) {
				this.stopForce = true;
				if (this.vel.x === 0) {
					this.vel.x = -vx;
				}
			} else {
				this.stopForce = false;
				this.acc.add(createVector(-f, 0));
				console.log("Applying FORCE!");
			}
		}
	};

	this.jump = function () {
		if (!this.isJumping) {
			this.jumpType = "single";
			this.touchingWalls.bottom = false;
			this.vel.y = vy;
			this.stopForce = true;
			console.log("Jumping!");
		} else if (this.jumpType === "single"){
			this.jumpType = "double";
		}
	};
	// Movements END ------------------------------------------------------

	this.stopAccelerating = function () {
		this.stopForce = true;
	};

	this.checkIfDead = function () {
		return this.pos.y > h;
	};

	this.show = function () {
		var x = this.pos.x,
			y = this.pos.y,
			s = this.size,
			angle = 5 * frameCount / (num_spins * PI);

		push();

		fill(this.clr);

 		translate(x + s/2, y + s/2);

		if (this.isJumping && this.shouldSpin) {
 			rotate(this.vel.x > 0 ? angle : - angle);
 		}

		rect(-s/2, -s/2, s, s);


		pop();
	};
}