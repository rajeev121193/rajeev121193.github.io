// Globals
var n = 1;
var h = w = 700;
var marginInterval = 10;

// Complex number Arithmentic Begin ------------------------------
function squareC(x) {
	return {
		a: x.a * x.a - x.b * x.b,
		b: 2 * x.a * x.b
	}
}

function addC(x, y) {
	return {
		a: x.a + y.a,
		b: x.b + y.b
	}
}

function distanceSquare(x) {
	return (x.a * x.a + x.b * x.b);
}
// Complex number Arithmentic End --------------------------------

function zVal(n, c) {
	if (n === 1) {
		return c;
	} else {
		var prev = zVal(n - 1, c);
		return addC(squareC(prev), c);
	}
}

function setup() {
	createCanvas(w, h);
	pixelDensity(1);
}

function draw() {
	loadPixels();

	// Tells if sufficient number of points are out of bounds
	var loopCount = 0;

	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {

			var R = 0, G = 0, B = 0;
			var actualX = x - width / 2;
			var actualY = y - height / 2;

			//Map the point to (-3, 3) to zoom in
			var c = {
				a: map(actualX, -width/2, width/2, -3, 3),
				b: map(actualY, -height/2, height/2, -3, 3)
			}

			var distSquare = distanceSquare(zVal(n, c));
			if (distSquare < 4) {
				// Still inside bounds, so show black
				R = 0;
				G = 0;
				B = 0;
			} else if (distSquare < 100000) {
				// Map the distance to color-levels
				var I = map(distSquare, 4, 100000, 0, 5);

				// Increase loopCount
				loopCount++;
				
				// Assign color based on distanceSquare
				if (I < 1) {
					G = 220; B = 220;
				} else if (I < 2) {
					G = 255; R = 255;
				} else if (I < 3) {
					R = 255; B = 220;
				} else if (I < 4) {
					R = 150; G = 150; B = 150;
				} else {
					R = 220; G = 220; B = 220;
				}
			} else if ((!(actualX % marginInterval) && actualY % 2) || (!(actualY % marginInterval) && actualX % 2)) {
				// Axes
				R = 0; G = 0; B = 150;
			} else {
				// Out of bounds - so, show white
				R = 255; G = 255; B = 255;
			}

			set(x, y, color(R, G, B));
		}
	}
	updatePixels();

	if (loopCount < 500) {
		// Repeat the loop from start, since sufficient points are out of bounds
		n = 1;
	} else {
		// Increase n for next iteration
		n++;
	}
}