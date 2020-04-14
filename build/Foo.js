"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function barFunction() {
    console.log("Hey from bar");
    let a = 1;
    if (a > 2) {
        console.log("Hello, world!");
    }
    else {
        console.log(`Value is ${a}`);
    }
    console.log("Bye bye from bar");
    return a;
}
exports.barFunction = barFunction;
//# sourceMappingURL=Foo.js.map