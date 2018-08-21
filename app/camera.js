

export class Camera {

    constructor(pos, dir, fov) {
        this.pos = pos;
        this.direction = dir;
        this.fov = fov;
    }

    drawLevel(level, canvas) {
        let c = canvas.getContext('2d');
        c.fillStyle = '#FF00FF';

        let dir = this.direction - (this.fov / 2);
        let dirStep = this.fov / canvas.width;
        for(let x = 0; x < canvas.width; x++) {
            let distance = level.raycast(this.pos, dir);
            let stripeHeight = canvas.height / (1 + distance);
            c.fillStyle = 'hsl(' + Math.round(((distance / 10) * 360) % 360) + ', 100%, 50%)';
            c.fillRect(x, canvas.height / 2 - stripeHeight / 2, 1, stripeHeight);

            dir += dirStep;
        }

    }

}