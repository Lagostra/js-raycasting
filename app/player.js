import { Camera } from './camera.js'
import { Main } from './main.js'

export class Player {

    constructor(position, direction, level) {
        this.pos = position;
        this.dir = direction;
        this.level = level;
        this.camera = new Camera(position[0], position[1], direction, 1.57);
    }

    tick() {
        if(Main.isKeyDown('ArrowLeft')) {
            this.dir -= 0.01;
        }
        if(Main.isKeyDown('ArrowRight')) {
            this.dir += 0.01;
        }
        let delta = 0;
        if(Main.isKeyDown('ArrowUp')) {
            delta += 0.1;
        }
        if(Main.isKeyDown('ArrowDown')) {
            delta -= 0.1;
        }
        console.log(this.pos[0]);
        this.pos[0] += delta * Math.cos(this.dir);
        this.pos[1] += delta * Math.sin(this.dir);
        console.log(this.pos[0], '\n');

        this.camera.pos = this.pos;
        this.camera.direction = this.dir;
    }

    draw(canvas) {
        this.camera.drawLevel(this.level, canvas);
    }

}