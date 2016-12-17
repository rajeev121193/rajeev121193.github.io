function Blob(x, y) {
	this.pos = createVector(x, y);
	this.rad = 50;
	this.vel = p5.Vector.random2D();
	this.vel.mult(10,10);

	this.update = function() {
		this.pos = this.pos.add(this.vel);
		
		if (this.pos.x < 0 || this.pos.x > width) {
			this.vel.x *= -1;
		}

		if (this.pos.y < 0 || this.pos.y > height) {
			this.vel.y *= -1;
		}
	}

	this.show = function() {
		noFill();
		ellipse(this.pos.x, this.pos.y, this.rad * 2, this.rad * 2);
	};
}