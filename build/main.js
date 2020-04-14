"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const phaser_1 = tslib_1.__importDefault(require("phaser"));
class MyScene extends phaser_1.default.Scene {
    preload() {
        this.cameras;
    }
}
let a;
let game = new phaser_1.default.Game({
    type: phaser_1.default.AUTO,
    width: 800,
    height: 600,
});
//# sourceMappingURL=main.js.map