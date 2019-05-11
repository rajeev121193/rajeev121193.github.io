class Wall {
    constructor(start, end, color, isBorder = false) {
        this.isBorder = isBorder;
        this.start = start;
        this.end = end;
        this.color = color;
    }

    draw() {
        stroke(this.color);
        strokeWeight(5);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
        strokeWeight(1);
    }
}