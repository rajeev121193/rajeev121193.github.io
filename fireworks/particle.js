function Particle(x, y, v, isBurst, color) {
	this.pos = createVector(x, y);
	this.vel = createVector(v.x, v.y);
	this.acc = createVector(0, 0.2);
	this.r = 2;
	this.pieces = 20;
	this.burstParticle = isBurst;
	this.life = 0;
	this.lifeSpan = random(50, 100);

	if (color) {
		this.color = {
			R: color.R,
			G: color.G,
			B: color.B
		};
	} else {
		this.color = {
			R: random(100, 255),
			G: random(100, 255),
			B: random(100, 255)
		};
	}
	
	if (this.burstParticle) {
		this.acc.mult(0.1);
		this.r /= 2;
	}

	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);

		if (this.burstParticle) {
			this.life++;
		}
	}

	this.show = function() {
		push();
		noStroke();
		fill(this.color.R, this.color.G, this.color.B);
		ellipse(this.pos.x, this.pos.y, this.r * 2);
		pop();
	}

	this.reachedTop = function() {
		return !this.burstParticle && (-this.vel.y < this.acc.y);
	}
}