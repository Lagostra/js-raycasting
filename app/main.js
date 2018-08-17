import { Level } from './level/level.js';

export class Main {

    constructor(canvas) {
        this.timer = null;
        this.UPDATE_INTERVAL = 1000 / 60.0;
        this.canvas = canvas;



        this.level = new Level();
    }

    start() {
        this.level.loadFromUrl('./app/levels/level1.txt').then((value) => {
            this.timer = setInterval(this.tick.bind(this), this.UPDATE_INTERVAL);
        });
    }

    stop() {
        clearInterval(this.timer);
    }

    tick() {
        this.draw();
    }

    draw() {
        console.log('Boop');
        let c = this.canvas.getContext('2d');
        c.fillStyle = '#000000';
        c.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < this.level.height; y++) {
            for (let x = 0; x < this.level.width; x++) {
                if (!this.level.blocks[y][x].solid) {
                    c.fillStyle = '#FFFFFF';
                    c.fillRect(x * 30, y * 30, 30, 30);
                }
            }
        }
    }
}
 