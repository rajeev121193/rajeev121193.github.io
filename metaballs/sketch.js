var blobs = [];
var num_blobs = 3;

function setup() {
	createCanvas(200, 200);
	pixelDensity(1);
	colorMode(HSB);

	for(var i = 0; i < num_blobs; i++) {
		blobs.push(new Blob(random(0, width), random(0, height)));
	}
}

function draw() {
	background(51);

	loadPixels();
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			var col = 0;
			for (var i = 0; i < num_blobs; i++) {
				var dis = dist(x, y, blobs[i].pos.x, blobs[i].pos.y);
				col += 100 * blobs[i].rad / dis;
			}
			set(x, y, color(col, 90, 100));
		}
	}
	updatePixels();

	blobs.forEach(function(blob) {
		blob.update();
		// blob.show();
	});
}