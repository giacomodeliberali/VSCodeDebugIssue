"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Foo_1 = require("Foo");
function fooFunction() {
    console.log("Hey");
    let a = 2;
    if (a > 2) {
        console.log("Hello, world!");
    }
    else {
        console.log(`Value is ${a}`);
    }
    console.log("Bye");
    return a;
}
test("foo test", () => {
    expect(fooFunction()).toEqual(2);
    expect(Foo_1.barFunction()).toEqual(1);
});
//# sourceMappingURL=Foo.test.js.map