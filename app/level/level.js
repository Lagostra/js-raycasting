import { Block } from './block.js';
import { SolidBlock } from "./solid-block.js";

function distance(v1, v2) {
    return Math.sqrt(Math.pow(v1[0] - v2[0], 2) + Math.pow(v1[1] - v2[1], 2));
}

export class Level {

    constructor() {
        this.blocks = null;
    }

    load(levelString) {
        let lines = levelString.split(/\r?\n/);
        this.width = parseInt(lines[0].split('x')[0]);
        this.height = parseInt(lines[0].split('x')[1]);
        let playerX = parseFloat(lines[1].split(',')[0]);
        let playerY = parseFloat(lines[1].split(',')[1]);
        let playerRotation = parseFloat(lines[2]);

        this.blocks = [];
        for(let y = 0; y < this.height; y++) {
            this.blocks[y] = [];
            for(let x = 0; x < this.width; x++) {
                let sym = lines[y + 3][x];

                switch(sym) {
                    case 'x':
                        this.blocks[y][x] = new SolidBlock();
                        break;
                    default:
                        this.blocks[y][x] = new Block();
                        break;
                }
            }
        }
    }

    loadFromUrl(url) {
        let request = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            request.open("GET", url);
            request.onreadystatechange = function() {
                if(request.readyState === 4) {
                    if(request.status === 200) {
                        this.load(request.responseText);
                        console.log('Level loaded.');
                        resolve(1);
                    } else {
                        reject(0);
                    }
                }
            }.bind(this);
            request.send();
        });
    }

    raycast(pos, dir) {
        let dir_vec = [Math.sin(dir), Math.cos(dir)];
        let step = Math.max(...dir_vec.map(x => Math.abs(x)));
        let dx = dir_vec[0] / step;
        let dy = dir_vec[1] / step;
        let x = pos[0];
        let y = pos[1];
        let i = 0;

        while(true) {
            x += dx;
            y += dy;
            i++;



            if(Number.isInteger(x) && dx != 0) {
                if(dx > 0) { // Right
                    if(x == this.width || this.blocks[Math.floor(y)][x].solid) {
                        return distance(pos, [x, y]);
                    }
                } else { // Left
                    if(x == 0 || this.blocks[Math.floor(y)][x - 1].solid) {
                        return distance(pos, [x, y]);
                    }
                }
            } else if(Number.isInteger(y) && dy != 0) {
                if(dy > 0) { // Down
                    if(y == this.height || this.blocks[y][Math.floor(x)].solid) {
                        return distance(pos, [x, y]);
                    }
                } else { // Up
                    if(y == 0 || this.blocks[y - 1][Math.floor(x)].solid) {
                        return distance(pos, [x, y]);
                    }
                }
            }
        }
    }

}