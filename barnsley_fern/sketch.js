const width = 800;
const height = 800;

let x = 0.0;
let y = 0.0;
let px = 0.0;
let py = 0.0;
let a = 50;

function setup() {
    createCanvas(width, height);
}

function initDraw() {
    stroke('rgba(50, 150, 50, 0.8)');
    strokeWeight(10);
    translate(width/2, 3*height/4);
}

function draw() {
    initDraw();
    point(px, py);

    const nextXY = findNextXY(x, y);
    x = nextXY [0];
    y = nextXY[1];
    px = map(x, -3, 3, -300, 300);
    py = map(y, -10, 10, 500, -500);
}

function findNextXY(x, y) {
    const r = random();
    if (r < 0.01) {
        return f1(x, y);
    } else if (r < 0.86) {
        return f2(x, y);
    } else if (r < 0.93) {
        return f3(x, y);
    } else {
        return f4(x, y);
    }
}

function f1(x, y) {
    return [0, 0.16 * y];
}

function f2(x, y) {
    return [0.85 * x + 0.04 * y, -0.04 * x + 0.85 * y + 1.6];
}

function f3(x, y) {
    return [0.2 * x - 0.26 * y, 0.23 * x + 0.22 * y + 1.6];
}

function f4(x, y) {
    return [-0.15 * x + 0.28 * y, 0.26 * x + 0.24 * y + 0.44];
}