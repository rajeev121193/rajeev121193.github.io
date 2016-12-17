var particles = [];
var prob_particle;

function setup() {
	createCanvas(windowWidth, windowHeight);
	prob_particle = 0.2;
}

function createParticleAtRandom(prob) {
	var createParticle = random(0, 1) < prob;
	if (createParticle) {
		createNewParticle();
	}
}

function createNewParticle(pos, color) {
	var vel, particle;
	if (pos) {
		vel = p5.Vector.random2D();
		vel.mult(random(0.1, 0.7));
		particle = new Particle(pos.x, pos.y, vel, true, color);
	} else {
		vel = createVector(0, random(-13, -17));
		particle = new Particle(random (0, width), height, vel, false, color);
	}
	
	particles.push(particle);
}

function showParticles() {
	particles.forEach(function(particle) {
		particle.update();
		particle.show();
	});
}

function burstParticles() {
	for (var i = particles.length - 1; i >= 0; i--) {
		if (particles[i].reachedTop()) {
			for (var j = particles[i].pieces; j >= 0; j--) {
				createNewParticle(particles[i].pos, particles[i].color);
			}
			particles.splice(i, 1);
		}
	}
}

function dissolveParticles() {
	for (var i = particles.length - 1; i >= 0; i--) {
		if (particles[i].burstParticle) {
			if (particles[i].life > particles[i].lifeSpan) {
				particles.splice(i, 1);
			}
		}
	}
}

function draw() {
	colorMode(RGB, 255);
	background(0);

	dissolveParticles();
	
	burstParticles();
	
	createParticleAtRandom(prob_particle);	

	showParticles();
}