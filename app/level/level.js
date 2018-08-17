import { Block } from './block.js';
import { SolidBlock } from "./solid-block.js";

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

}
