class PointLight {
    constructor(pos, numRays, fov, color, createIllumination = false, createShadow = false) {
        this.pos = pos;
        this.numRays = numRays;
        this.fov = fov;
        this.color = color;
        this.createIllumination = createIllumination;
        this.createShadow = createShadow;
        this.createRays();
    }

    setPos(pos) {
        this.pos = pos;
        this.createRays();
    }

    setCreateShadow(createShadow) {
        this.createShadow = createShadow;
    }

    setCreateIllumination(createIllumination) {
        this.createIllumination = createIllumination;
    }

    updateNumRays(numRays) {
        this.numRays = numRays;
        this.createRays();
    }

    createRays() {
        this.rays = [];
        
        const angIncrement = this.fov/this.numRays;
        for (let i = 0; i < this.fov; i += angIncrement) {
            this.rays.push(new Ray(this.pos, i, this.color));
        }
    }

    processRay(ray, walls) {
        let hitPoint;
        let shadowPoint;
        const hitPoints = walls.map(wall => {
            const pt = ray.getWallHit(wall);
            return {
                pt,
                dist: pt ? this.pos.dist(pt) : Infinity
            }
        }).sort((p1, p2) => p1.dist - p2.dist);
        
        if (hitPoints.length > 0) {
            hitPoint = hitPoints[0].pt;
        }

        if (hitPoints.length > 1) {
            shadowPoint = hitPoints[1].pt;
        }

        return {
            hitPoint,
            shadowPoint
        }
    }

    draw(walls) {
        //Circle of light
        stroke(this.color);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, 10, 10);

        //Rays
        this.rays.forEach(ray => {
            const {hitPoint, shadowPoint} = this.processRay(ray, walls);
            if (hitPoint) {
                stroke(color(red(this.color), green(this.color), blue(this.color), 100));
                line(this.pos.x, this.pos.y, hitPoint.x, hitPoint.y);
                if (this.createIllumination) {
                    stroke(255, 255, 255, 150);
                    strokeWeight(5);
                    point(hitPoint.x, hitPoint.y)
                    strokeWeight(1);
                }
            }

            if (this.createShadow && shadowPoint) {
                stroke(0, 0, 0, 150);
                strokeWeight(6);
                point(shadowPoint.x, shadowPoint.y);
                strokeWeight(1);
            }
            ray.draw();
        });
    }
}