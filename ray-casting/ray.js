class Ray {
    constructor(origin, angle, color) {
        this.origin = origin;
        this.dir = p5.Vector.fromAngle(radians(angle));
        this.color = color;
    }

    draw() {
        stroke(this.color);
        push();
        translate(this.origin.x, this.origin.y);
        line(0, 0, this.dir.x, this.dir.y);
        pop();
    }

    getWallHit(wall) {
        const {start, end} = wall;
        const {x: x1, y: y1} = start;
        const {x: x2, y: y2} = end;
        const {x: x3, y: y3} = this.origin;
        let {x: x4, y: y4} = this.dir;
        x4 += x3;
        y4 += y3;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
            return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4))/den;
        const u = ((y1 - y2) * (x1 - x3) - (x1 - x2) * (y1 - y3))/den;

        if (t > 0 && t < 1 && u > 0) {
            return createVector(x1 + t*(x2 - x1), y1 + t*(y2 - y1));
        } else {
            return;
        }
    }
}